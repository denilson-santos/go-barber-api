export interface IMailProvider {
  sendEmail(to: string, body: string): Promise<void>;
}
