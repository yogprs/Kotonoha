import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as LoginBody;

  if (!body.identifier || !body.password) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation Failed',
      message: 'All field (email/username, Password) is required!',
      data: {
        fields: {
          identifier: !body.identifier, // email or username
          password: !body.password,
        },
      },
    });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: body.identifier }, { email: body.identifier }],
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      image: true,
      password: true,
    },
  });

  if (!existingUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Email or Username is already registered.',
    });
  }

  const isPasswordMatch = await bcrypt.compare(
    body.password,
    existingUser?.password as string,
  );

  if (!isPasswordMatch) {
    throw createError({
      statusCode: 401,
      message: "Your password is doesn't match.",
    });
  }

  return { success: true, message: 'User login is successfully!' };
});
