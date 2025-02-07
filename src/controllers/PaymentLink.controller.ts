import { Request, Response } from 'express';
import { PaymentLinkService } from '../services/PaymentLink.services';
import { Repository } from 'typeorm';
import { PaymentLink } from '../entities/PaymentLink';
import AppDataSource from '../config/db';

export class PaymentLinkController {
    private paymentLinkService: PaymentLinkService;

    constructor() {
        const paymentLinkRepository: Repository<PaymentLink> = AppDataSource.getRepository(PaymentLink);
        this.paymentLinkService = new PaymentLinkService(paymentLinkRepository);
    }

    async createPaymentLink(req: Request, res: Response): Promise<any> {
        try {
            const paymentLink = await this.paymentLinkService.createPaymentLink(req.body);
            return res.status(201).json(paymentLink);
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    }

    async getPaymentLinkById(req: Request, res: Response): Promise<any> {
        try {
            const paymentLink = await this.paymentLinkService.getPaymentLinkById(req.params.id);
            if (!paymentLink) {
                return res.status(404).json({ message: 'PaymentLink not found' });
            }
            return res.json(paymentLink);
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    }

    async updatePaymentLink(req: Request, res: Response): Promise<any> {
        try {
            const updatedPaymentLink = await this.paymentLinkService.updatePaymentLink(req.params.id, req.body);
            if (!updatedPaymentLink) {
                return res.status(404).json({ message: 'PaymentLink not found' });
            }
            return res.json(updatedPaymentLink);
        } catch (error) {
            return res.status(400).json({ message: (error as Error).message });
        }
    }

    async deletePaymentLink(req: Request, res: Response): Promise<any> {
        try {
            const success = await this.paymentLinkService.deletePaymentLink(req.params.id);
            if (!success) {
                return res.status(404).json({ message: 'PaymentLink not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    }
}
