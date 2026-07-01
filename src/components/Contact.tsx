import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Github, Linkedin, Facebook, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Web3Forms API token template key. User can swap this out.
    const ACCESS_KEY = "89cf6663-4de1-4d45-8e01-0f972af36b3e";

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          ...data,
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        toast({
          title: 'Message Sent Successfully!',
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Delivery Failed',
          description: resData.message || 'Web3Forms rejected the submission.',
        });
      }
      reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Connection Error',
        description: 'Failed to contact the email delivery server.',
      });
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/itsmeLan', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/roland-abellanosa-441a28417', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://web.facebook.com/rolandsuico.abellanosa', label: 'Facebook' },
  ];

  return (
    <section id="contact" ref={ref} className="py-20 bg-secondary transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  {...register('name')}
                  className={`bg-card border-border text-foreground placeholder:text-muted-foreground ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''
                    }`}
                />
                {errors.name && (
                  <span className="text-xs text-destructive mt-1 block">{errors.name.message}</span>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  {...register('email')}
                  className={`bg-card border-border text-foreground placeholder:text-muted-foreground ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''
                    }`}
                />
                {errors.email && (
                  <span className="text-xs text-destructive mt-1 block">{errors.email.message}</span>
                )}
              </div>

              <div>
                <Textarea
                  placeholder="Your Message"
                  {...register('message')}
                  rows={6}
                  className={`bg-card border-border text-foreground placeholder:text-muted-foreground resize-none ${errors.message ? 'border-destructive focus-visible:ring-destructive' : ''
                    }`}
                />
                {errors.message && (
                  <span className="text-xs text-destructive mt-1 block">{errors.message.message}</span>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">Connect With Me</h3>
            <p className="text-muted-foreground mb-8">
              Follow me on social media for updates on my latest projects and tech insights.
            </p>
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary transition-all duration-300 group"
                >
                  <social.icon className="text-muted-foreground group-hover:text-primary transition-colors" size={24} />
                  <span className="text-foreground group-hover:text-primary transition-colors">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
