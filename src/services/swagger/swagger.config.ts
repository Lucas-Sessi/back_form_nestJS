import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeName } from 'swagger-themes';

export class Swagger {
    setup(app) {
        const defaultThemeSwagger = process.env.SWAGGER_THEME || 'default';
        const theme = new SwaggerTheme()
        const config = new DocumentBuilder()
        .setTitle('back-form')
        .setDescription('The back-form API description')
        .setVersion('3.0')
        .addTag('back-form')
        .build();

        const optionsTheme = {
            explorer: true,
            customCss: theme.getBuffer(defaultThemeSwagger as SwaggerThemeName),
        }
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document, optionsTheme);
    }
}