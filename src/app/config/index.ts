import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {

    setup: {
        node_env: process.env.NODE_ENV,
        port: process.env.PORT,
        domain: process.env.DOMAIN,
    },

    url: {
        frontend_base_url_1: process.env.FRONTEND_BASE_URL_1,
        frontend_base_url_2: process.env.FRONTEND_BASE_URL_2,
        frontend_base_url_3: process.env.FRONTEND_BASE_URL_3,
        frontend_base_url_4: process.env.FRONTEND_BASE_URL_4,

        backend_base_url: process.env.BACKEND_BASE_URL,
        ai_backend_base_url: process.env.AI_BACKEND_BASE_URL,
        database_url: process.env.DATABASE_URL,
    },

    admin: {
        email: process.env.ADMIN_EMAIL,
        phone: process.env.ADMIN_PHONE_NUMBER,
        password: process.env.ADMIN_PASSWORD
    },

    super_admin: {
        email: process.env.SUPER_ADMIN_EMAIL,
        phone: process.env.SUPER_ADMIN_PHONE_NUMBER,
        password: process.env.SUPER_ADMIN_PASSWORD
    },

    jwt: {
        accessToken: process.env.JWT_ACCESS_SECRET,
        refreshToken: process.env.JWT_REFRESH_SECRET,
        accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        reset_pass_secret: process.env.JWT_RESET_PASS_SECRET,
        reset_pass_token_expires_in: process.env.JWT_RESET_PASS_EXPIRES_IN
    },

    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },

    aws: {
        account: {
            access_key: process.env.ACCOUNT_ACCESS_KEY,
            secret_key: process.env.ACCOUNT_SECRET_KEY,
        },
        s3: {
            region: process.env.S3_REGION,
            bucket_name: process.env.S3_BUCKET_NAME,
        },
    },

    nodeMiller: {
        email_host: process.env.EMAIL_HOST,
        email_port: process.env.EMAIL_PORT,
        email_user: process.env.EMAIL_USER,
        email_pass: process.env.EMAIL_PASS,
        email_from: process.env.EMAIL_FROM,
    },

    redis: {
        redis_host: process.env.REDIS_HOST,
        redis_port: process.env.REDIS_PORT,
        redis_username: process.env.REDIS_USERNAME,
        redis_password: process.env.REDIS_PASSWORD
    },

    redirect_url: {
        frontendSuccessUrl: process.env.FRONTEND_SUCCESS_URL,
        frontendFailUrl: process.env.FRONTEND_FAIL_URL,
        frontendCancelUrl: process.env.FRONTEND_CANCEL_URL,
    },

    bcrypt: {
        salt_rounds: Number(process.env.SALT_ROUNDS),
    },

    stripe: {
        secret_key: process.env.STRIPE_SECRET_KEY,
        webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    }

}
