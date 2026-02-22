import { prisma } from '~~/server/utils/prisma';
import { getProfile } from '~~/server/utils/profile';
import { isValidEmail } from '~~/server/utils/data';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = (await readBody(event)) as RegisterBody;

  if (!body.email || !body.name || !body.password || !body.username) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation Failed',
      message: 'All field (Email, Name, Password, Username) is required!',
      data: {
        fields: {
          email: !body.email,
          name: !body.name,
          password: !body.password,
          username: !body.username,
        },
      },
    });
  }

  const validEmail = isValidEmail(body?.email);

  if (!validEmail) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation Failed',
      message: 'Email format is invalid. Please make sure your email input!.',
      data: {
        fields: {
          email: !validEmail,
        },
      },
    });
  }

  body.username = body.username?.toLowerCase();
  body.email = body.email?.toLowerCase();
  body.image = getProfile(config.dice_bear_image, 'initials', body?.name);

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: body.username }, { email: body.email }],
    },
  });

  if (existingUser) {
    const isEmailTaken = existingUser.email === body.email;
    const message = isEmailTaken
      ? 'Email is already taken. Please use another email.'
      : 'Username is already used.';
    throw createError({
      statusCode: 409,
      statusMessage: 'Conflict',
      message: message,
    });
  }

  const hashed = await bcrypt.hash(body?.password, 10);

  await prisma.user.create({
    data: {
      name: body?.name,
      username: body?.username,
      email: body?.email,
      image: body?.image,
      password: hashed,
    },
  });

  return { success: true, message: 'User registrations is successfully!' };
});
