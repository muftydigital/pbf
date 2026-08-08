import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
      }
    
      try {

        const contactData = req.body //JSON.parse(req.body);

        await prisma.contact.create({
            data: contactData
        })

        res.status(200).json(contactData)
    } catch (err) {
        console.log("from API error", err)
        res.status(400).json({ message: 'Something went wrong' });
    }
  }