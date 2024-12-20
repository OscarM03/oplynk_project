"use server";

import axios from 'axios';


const PAYPAL_API_URL = 'https://api.paypal.com';
console.log('CLIENT_ID:', process.env.PAYPAL_CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.PAYPAL_CLIENT_SECRET);



const getPayPalAccessToken = async () => {
    try {
        const credentials = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`;
        const base64Credentials = Buffer.from(credentials).toString('base64');

        const response = await axios.post(
            'https://api.paypal.com/v1/oauth2/token',
            'grant_type=client_credentials',
            {
                headers: {
                    Authorization: `Basic ${base64Credentials}`, 
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        return response.data.access_token;
    } catch (error: any) {
        console.error('Error creating PayPal payment:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create PayPal payment');
    }
    
};


export const createPayment = async (amount: number, returnUrl: string, cancelUrl: string) => {
    try {
        const accessToken = await getPayPalAccessToken();
        const response = await axios.post(
            `${PAYPAL_API_URL}/v1/payments/payment`,
            {
                intent: 'sale',
                payer: { payment_method: 'paypal' },
                transactions: [
                    {
                        amount: { total: amount.toString(), currency: 'USD' },
                        description: `Deposit to project account`,
                    },
                ],
                redirect_urls: { return_url: returnUrl, cancel_url: cancelUrl },
            },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        throw new Error('Failed to create PayPal payment');
    }
};

export const executePayment = async (paymentId: string, payerId: string) => {
    try {
        const accessToken = await getPayPalAccessToken();
        const response = await axios.post(
            `${PAYPAL_API_URL}/v1/payments/payment/${paymentId}/execute`,
            { payer_id: payerId },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error executing PayPal payment:', error);
        throw new Error('Failed to execute PayPal payment');
    }
};

export const createWithdrawal = async (recipientEmail: string, amount: number, currency: string = 'USD') => {
    try {
        const accessToken = await getPayPalAccessToken();

        const response = await axios.post(
            `${PAYPAL_API_URL}/v1/payments/payouts`,
            {
                sender_batch_header: {
                    sender_batch_id: `batch_${Date.now()}`,
                    email_subject: 'You have received a payment!',
                    email_message: 'You have received a withdrawal payment via PayPal.',
                },
                items: [
                    {
                        recipient_type: 'EMAIL',
                        amount: {
                            value: amount.toFixed(2),
                            currency: currency,
                        },
                        receiver: recipientEmail,
                        note: 'Withdrawal payment',
                        sender_item_id: `item_${Date.now()}`,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error('Error creating PayPal withdrawal:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create PayPal withdrawal');
    }
};
