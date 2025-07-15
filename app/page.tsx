"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  Brain,
  CheckCircle,
  ChevronDown,
  Leaf,
  Package,
  ScanEye,
  ShoppingCart,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userId = localStorage.getItem("user");
    if (userId) {
      router.push(`/p/${userId}/dashboard`);
    }
  }, [router]);

  if (!mounted) {
    return null;
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: <Package className="h-8 w-8" />,
      title: "Product Marketplace",
      description:
        "Buy and sell agricultural products directly from farmers to consumers",
    },
    {
      icon: <BadgeDollarSign className="h-8 w-8" />,
      title: "Live Auctions",
      description:
        "Participate in real-time auctions for the best deals on fresh produce",
    },
    {
      icon: <ScanEye className="h-8 w-8" />,
      title: "Disease Management",
      description:
        "AI-powered disease detection to help farmers maintain healthy crops",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Crop Recommendations",
      description:
        "Smart recommendations based on location and soil conditions",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Farmers" },
    { number: "5K+", label: "Happy Buyers" },
    { number: "50K+", label: "Products Sold" },
    { number: "98%", label: "Success Rate" },
  ];

  const testimonials = [
    {
      name: "Ram Bahadur",
      role: "Farmer from Chitwan",
      content:
        "AgriConnect has transformed how I sell my crops. Direct access to buyers means better prices!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ram",
    },
    {
      name: "Sita Sharma",
      role: "Buyer from Kathmandu",
      content:
        "Fresh products directly from farmers at competitive prices. The auction feature is amazing!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sita",
    },
    {
      name: "Krishna Thapa",
      role: "Agricultural Entrepreneur",
      content:
        "The crop recommendation system helped me choose the right crops for my region.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Krishna",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/logo.png" alt="AgriConnect" className="h-10 w-auto" />
            {/* <span className="text-2xl font-bold text-primary">AgriConnect</span> */}
          </motion.div>

          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Testimonials
            </a>
          </div>

          <div className="flex space-x-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              Connecting
              <motion.span
                className="text-primary block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background:
                    "linear-gradient(90deg, #059669, #10b981, #34d399)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Farmers & Buyers
              </motion.span>
              in Nepal
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              The ultimate marketplace for agricultural products featuring live
              auctions, AI-powered crop recommendations, and disease management
              solutions.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="px-8 py-4 text-lg">
                    Start Selling <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-4 text-lg"
                  >
                    Start Buying <ShoppingCart className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 relative"
          >
            <div className="relative max-w-4xl mx-auto">
              {/* <motion.img
                src="/banner-2.png"
                alt="AgriConnect Platform"
                className="w-full rounded-2xl shadow-2xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              /> */}

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Leaf className="h-8 w-8 text-green-500" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-green-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Powerful Features for
              <span className="text-primary"> Modern Agriculture</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Everything you need to succeed in agricultural trading and farming
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4">About AgriConnect</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Revolutionizing Agriculture in Nepal
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                AgriConnect is Nepal's first comprehensive agricultural
                marketplace that bridges the gap between farmers and buyers
                while providing cutting-edge tools for modern farming.
              </p>

              <div className="space-y-4">
                {[
                  "Direct farmer-to-consumer connections",
                  "Real-time auction system",
                  "AI-powered crop recommendations",
                  "Disease detection and management",
                  "Secure payment processing",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.img
                  src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e4c?w=300"
                  alt="Farmer"
                  className="rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                />
                <motion.img
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300"
                  alt="Crops"
                  className="rounded-lg shadow-lg mt-8"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              What Our Users Say
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600">
              Trusted by thousands of farmers and buyers across Nepal
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Ready to Transform Your Agricultural Business?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-green-100 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of farmers and buyers who are already using
              AgriConnect to grow their agricultural business.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="px-8 py-4 text-lg"
                  >
                    Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="AgriConnect" className="h-8 w-auto" />
                {/* <span className="text-xl font-bold">AgriConnect</span> */}
              </div>
              <p className="text-gray-400">
                Connecting farmers and buyers across Nepal for a better
                agricultural future.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Product Marketplace</li>
                <li>Live Auctions</li>
                <li>Crop Recommendations</li>
                <li>Disease Management</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold mb-4">Get Started</h3>
              <Link href="/register">
                <Button className="w-full">Join AgriConnect</Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 AgriConnect Nepal. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronDown className="h-6 w-6 rotate-180" />
      </motion.button>
    </div>
  );
}
