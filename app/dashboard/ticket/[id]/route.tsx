import { Application } from '@prisma/client';
import { Page, Text, View, Document, Image, renderToStream } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';
import QRCode from "qrcode";

import { db } from '@/lib/prisma';

interface Props {
  app: Application;
  url: string;
}

const Ticket = ({ app, url }: Props) => {
  return (
    <Document>
      <Page size="A4" style={{ border: "1px solid black", padding: "30px 20px" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image
            src="https://utfs.io/f/e3e6625d-96dd-48c4-846a-10969b4fe0b1-1zbfv.png"
            style={{ width: "60px", height: "60px", objectFit: "contain" }}
          />
          <View style={{ flexDirection: "column", gap: "2px", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: "16px", letterSpacing: "1px" }}>
              Armanitola Government High School
            </Text>
            <Text style={{ fontSize: "16px", letterSpacing: "1px" }}>Reunion 2024</Text>
            <View style={{ marginTop: "5px", border: "2px dotted gray", padding: "5px", display: "flex" }}>
              <Text style={{ fontSize: "16px", letterSpacing: "2px", textTransform: "uppercase" }}>Ticket</Text>
            </View>
          </View>
          <View style={{ border: "1px solid black" }}>
            <Image src={app.imageUrl} style={{ width: "80px", height: "80px", objectFit: "contain" }} />
          </View>
        </View>

        <View style={{ width: "100%", height: "1px", backgroundColor: "gray", margin: "10px 0" }} />

        <View style={{ flexDirection: "column", gap: "5px" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
            <Text style={{ fontSize: "12px" }}>Application ID:</Text>
            <Text style={{ fontSize: "12px" }}>{app.appId}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
            <Text style={{ fontSize: "12px" }}>Date:</Text>
            <Text style={{ fontSize: "12px" }}>{format(app.createdAt, "dd MMM yyyy")}</Text>
          </View>
        </View>

        <View style={{ marginTop: "20px", flexDirection: "column", gap: "10px" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
            <View style={{ width: "10px", height: "10px", backgroundColor: "black", display: "flex" }} />
            <Text style={{ fontSize: "14px" }}>Personal Information</Text>
          </View>
          <View style={{ flexDirection: "column", gap: "5px" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Text style={{ fontSize: "12px", width: "100px" }}>Name</Text>
              <Text style={{ fontSize: "12px" }}>{app.name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Text style={{ fontSize: "12px", width: "100px" }}>Passing Year</Text>
              <Text style={{ fontSize: "12px" }}>{app.batch}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Text style={{ fontSize: "12px", width: "100px" }}>Phone</Text>
              <Text style={{ fontSize: "12px" }}>{app.phone}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Text style={{ fontSize: "12px", width: "100px" }}>Email</Text>
              <Text style={{ fontSize: "12px" }}>{app.email}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: "40px", alignItems: "center" }}>
          <Image src={url} style={{ width: "150px", height: "150px" }} />
        </View>

        <View style={{ marginTop: "40px", alignItems: "center" }}>
          <Text style={{ fontSize: "10px", textAlign: "center" }}>[Note: Please preserve this ticket for entry and other facilities.]</Text>
        </View>
      </Page>
    </Document>
  )
}

export async function GET(request: Request, { params }: { params: { id: string; } }) {
  const app = await db.application.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!app) {
    return new NextResponse('Application not found', { status: 404 });
  }
  
  if(!app.isPaid) {
    return new NextResponse('Please pay to download ticket', { status: 404 });
  }

  const url = await QRCode.toDataURL(`http://localhost:3000/dashboard/application/${app.id}`);

  const stream = await renderToStream(<Ticket app={app} url={url} />);
  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Ticket.pdf"',
    },
  });
}