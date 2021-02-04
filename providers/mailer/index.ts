import { createTransport } from "nodemailer";
import { config } from "@server/config";

export const transporter = createTransport(
  Object.assign(config.providers.mailer, {
    secure: config.providers.mailer.port === 465,
  }),
);
