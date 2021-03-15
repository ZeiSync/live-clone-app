import * as dotenv from 'dotenv';
import * as fs from 'fs-extra';
import * as handlebars from 'handlebars';
import * as path from 'path';
import * as sgMail from '@sendgrid/mail';

const {
  parsed: { SENDGRID_API_KEY, EMAIL },
} = dotenv.config();
sgMail.setApiKey(SENDGRID_API_KEY);
export interface EmailTemplateOptions {
  template: string;
  data: any;
}

export const renderEmailContent = async ({
  template,
  data,
}: EmailTemplateOptions): Promise<string> => {
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    `${template}.hbs`,
  );
  const rawContent = await fs.readFile(templatePath, 'utf8');
  return handlebars.compile(rawContent)(data);
};

export interface EmailOptions {
  from?: string;
  to: string;
  html: string;
  subject?: string;
  text?: string;
  templateId?: string;
  dynamicTemplateData?: { [key: string]: any };
}

export const sendEmail = async ({
  from = EMAIL,
  to,
  html = '<p>Hello from Live!!!</p>',
  subject = 'Hello from Live!!!',
  text = 'Hello There!',
  templateId,
  dynamicTemplateData,
}: EmailOptions): Promise<void> => {
  try {
    await sgMail.send({
      to,
      from,
      html,
      subject,
      text,
      templateId,
      dynamicTemplateData,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
