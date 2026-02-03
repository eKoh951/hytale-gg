"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  Tags,
  Play,
  Zap,
  Globe,
  Smartphone,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const features = [
  {
    icon: Wifi,
    title: "Ping Testing",
    description:
      "Test your connection to any server before joining. Know your latency instantly.",
  },
  {
    icon: Tags,
    title: "Personal Tags",
    description:
      "Organize servers with your own custom tags. Build personal collections that matter to you.",
  },
  {
    icon: Play,
    title: "Creator Reviews",
    description:
      "Watch authentic video reviews from trusted creators. Make informed decisions.",
  },
  {
    icon: Zap,
    title: "Real-time Status",
    description:
      "Live player counts and server status. Always know what's happening.",
  },
  {
    icon: Globe,
    title: "Global Directory",
    description:
      "Servers from every region. Filter by US, EU, Asia, or Latin America.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Built for your phone. Discover servers anywhere, anytime with our PWA.",
  },
];

export function Features() {
  return (
    <section className="border-t border-border bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base font-semibold text-primary">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Server discovery, reimagined
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Tools built specifically for Hytale players. Find your community
            faster.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
