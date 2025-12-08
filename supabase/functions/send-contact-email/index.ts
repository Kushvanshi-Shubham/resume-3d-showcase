import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactFormData = await req.json();

    // Validate inputs
    if (!name || !email || !message) {
      console.error("Missing required fields:", { name: !!name, email: !!email, message: !!message });
      return new Response(JSON.stringify({ error: "Name, email, and message are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Length validation
    if (name.length > 100 || email.length > 255 || message.length > 5000) {
      console.error("Input too long");
      return new Response(JSON.stringify({ error: "Input exceeds maximum length" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Sending contact email from:", name, email);

    // Send notification to portfolio owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["shubhamkushvanshi@gmail.com"],
      reply_to: email,
      subject: `New Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            New Message from Your Portfolio
          </h1>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">Message:</h2>
            <p style="color: #475569; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    console.log("Owner email sent:", ownerEmailResponse);

    // Send confirmation email to sender with branded design
    const confirmationEmailResponse = await resend.emails.send({
      from: "Shubham Kushvanshi <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for reaching out!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0c0a1a 0%, #1a1a2e 50%, #0f172a 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: rgba(15, 23, 42, 0.95); border-radius: 24px; border: 1px solid rgba(6, 182, 212, 0.2); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 80px rgba(6, 182, 212, 0.1);">
                  
                  <!-- Header with gradient accent -->
                  <tr>
                    <td style="padding: 0;">
                      <div style="height: 4px; background: linear-gradient(90deg, #06b6d4, #22d3ee, #67e8f9, #22d3ee, #06b6d4); border-radius: 24px 24px 0 0;"></div>
                    </td>
                  </tr>
                  
                  <!-- Logo/Brand section -->
                  <tr>
                    <td align="center" style="padding: 40px 40px 20px;">
                      <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #06b6d4, #22d3ee); border-radius: 16px; display: inline-block; line-height: 60px; font-size: 28px; font-weight: bold; color: #0f172a;">SK</div>
                    </td>
                  </tr>
                  
                  <!-- Main heading -->
                  <tr>
                    <td align="center" style="padding: 0 40px 10px;">
                      <h1 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #f8fafc, #e2e8f0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                        Thanks for reaching out, ${name}!
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Subheading -->
                  <tr>
                    <td align="center" style="padding: 0 40px 30px;">
                      <p style="margin: 0; font-size: 16px; color: #94a3b8; line-height: 1.6;">
                        I've received your message and will get back to you as soon as possible.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Message card -->
                  <tr>
                    <td style="padding: 0 40px 30px;">
                      <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(6, 182, 212, 0.15); border-radius: 16px; padding: 24px;">
                        <p style="margin: 0 0 12px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #06b6d4;">Your Message</p>
                        <p style="margin: 0; font-size: 15px; color: #cbd5e1; line-height: 1.7; font-style: italic;">"${message}"</p>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- CTA section -->
                  <tr>
                    <td align="center" style="padding: 0 40px 30px;">
                      <p style="margin: 0 0 20px; font-size: 15px; color: #94a3b8;">
                        In the meantime, feel free to explore my work:
                      </p>
                      <a href="https://shubham-portfolio.lovable.app/projects" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #06b6d4, #0891b2); color: #0f172a; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4);">
                        View My Projects →
                      </a>
                    </td>
                  </tr>
                  
                  <!-- Divider -->
                  <tr>
                    <td style="padding: 0 40px;">
                      <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent);"></div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td align="center" style="padding: 30px 40px 40px;">
                      <p style="margin: 0 0 16px; font-size: 15px; color: #f8fafc;">
                        Best regards,<br>
                        <strong style="background: linear-gradient(135deg, #06b6d4, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Shubham Kushvanshi</strong>
                      </p>
                      
                      <!-- Social links -->
                      <div style="margin-top: 20px;">
                        <a href="https://github.com/Kushvanshi-Shubham" style="display: inline-block; margin: 0 8px; width: 36px; height: 36px; background: rgba(30, 41, 59, 0.8); border-radius: 10px; line-height: 36px; text-decoration: none; border: 1px solid rgba(6, 182, 212, 0.2);">
                          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" style="width: 18px; height: 18px; vertical-align: middle; filter: invert(1) brightness(0.7);">
                        </a>
                        <a href="https://linkedin.com/in/shubham-kushvanshi" style="display: inline-block; margin: 0 8px; width: 36px; height: 36px; background: rgba(30, 41, 59, 0.8); border-radius: 10px; line-height: 36px; text-decoration: none; border: 1px solid rgba(6, 182, 212, 0.2);">
                          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn" style="width: 18px; height: 18px; vertical-align: middle; filter: invert(1) brightness(0.7);">
                        </a>
                      </div>
                      
                      <p style="margin: 24px 0 0; font-size: 12px; color: #64748b;">
                        This is an automated confirmation. Please do not reply to this email.
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmailResponse);

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
