import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import { useState } from 'react'
import AddScreen from '../components/AddScreen'
import DisplayScreen from '../components/DisplayScreen'

const prisma = new PrismaClient()

export const getServerSideProps = async () => {
  const contacts = await prisma.contact.findMany()
  return {
    props: {
      initialContacts: contacts
    }
  }
}






export default function Home({ initialContacts }) {
  const [contacts, setContacts] = useState(initialContacts)


  const getContacts = async () => {
    const resp = await fetch('/api/getAllContacts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf8'
      }
    })
    const data = await resp.json();
    console.log(data)
    setContacts(data)
  }


  const saveContact = async (contact) => {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json; charset=utf8'
      }
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    await getContacts()

    return await response.json()

  }

  const delContact = async (contactId) => {
    console.log("contact to delete: "+contactId)
    if (window.confirm("Do you want to delete this food?")) {
      await fetch('/api/deleteContact', {
        method: 'POST',
        body: JSON.stringify({
          id: contactId
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf8'
        }
      })
    }

    await getContacts()

  }


  return (
    <div className="">
      <Head>
        <title>Contact App</title>
        <meta name="description" content="Created by Connelblaze" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid md:grid-cols-3">
      
        <AddScreen contacts = { contacts } AddContactFormProps = {async (data, e) => {
          try {
            await saveContact(data)
            e.target.reset()
          } catch (error) {
            console.log(error);
          }
        }} />

        <DisplayScreen contacts = { contacts } delContact = { delContact } />
      </div>
    </div>
  )
}
