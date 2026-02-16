import Redis from "ioredis";

export default defineNitroPlugin(async (nitroApp) => {
    const storage = useStorage();
    const config = useRuntimeConfig()

    const redis = new Redis({
        host: config?.redis_host,
        port: config?.redis_port,
        password: config?.redis_password,
        lazyConnect: true,
        // connectTimeout: 5000,
        // maxRetriesPerRequest: 1,
    });
    
    try {
        await redis.connect()
        console.log('✅ Redis connected')

        nitroApp.hooks.hook('close', async () => {
            await redis.quit()
            console.log('🛑 Redis disconnected')
        })

        // Simpan redis client di nitroApp
        nitroApp.redis = redis
    } catch (err) {
        console.error('❌ Redis connection failed:', err)
        nitroApp.redis = null
    }
})