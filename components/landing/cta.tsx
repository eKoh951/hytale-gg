"use client";

import { motion } from "framer-motion";
import { ArrowRight, Server, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary/60" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Content */}
          <div className="relative px-6 py-16 sm:px-16 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to find your community?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
                Join thousands of Hytale players discovering their perfect
                servers. Whether you're a player or a server owner, we've got
                you covered.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Find Servers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  List a Server
                </Button>
              </div>

              <p className="mt-6 text-sm text-primary-foreground/60">
                Community-driven. Anyone can add servers to the directory.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
