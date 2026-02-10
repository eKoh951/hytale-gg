"use client";

import * as m from "motion/react-m";
import { Clock, ArrowRight, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MagicParticles,
  GlyphPattern,
  TerrainDivider,
  StoneCard,
} from "@/components/ui/hytale-decorations";
import { HeroBackground } from "@/components/ui/section-backgrounds";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface SurveyItem {
  slug: string;
  title: string;
  description: string;
  totalQuestions: number;
  estimatedMinutes: number;
}

interface HomeSurveyListProps {
  surveys: SurveyItem[];
  title: string;
  subtitle: string;
}

export function HomeSurveyList({ surveys, title, subtitle }: HomeSurveyListProps) {
  const t = useTranslations();

  return (
    <HeroBackground backgroundImage="/hytale-assets/wallpapers-1.jpg" showParticles={false}>
      <GlyphPattern opacity={0.02} />
      <MagicParticles count={15} className="z-[1]" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            {subtitle}
          </p>
        </m.div>

        {/* Survey Cards */}
        {surveys.length === 0 ? (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StoneCard className="flex flex-col items-center gap-4 py-16 text-center">
              <ClipboardList className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg text-muted-foreground">
                {t("survey.listing.noSurveys")}
              </p>
            </StoneCard>
          </m.div>
        ) : (
          <div className="flex flex-col gap-5">
            {surveys.map((survey, index) => (
              <m.div
                key={survey.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              >
                <StoneCard className="group transition-all hover:border-primary/40">
                  <div className="p-5 sm:p-6">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">
                        <Clock className="mr-1 h-3 w-3" />
                        {t("survey.listing.estimatedTime", {
                          minutes: survey.estimatedMinutes,
                        })}
                      </Badge>
                      <Badge variant="outline" className="border-border">
                        {t("survey.listing.questions", {
                          count: survey.totalQuestions,
                        })}
                      </Badge>
                    </div>

                    {/* Title & Description */}
                    <h2 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
                      {survey.title}
                    </h2>
                    <p className="mt-1.5 text-muted-foreground">
                      {survey.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-5">
                      <Button asChild className="gap-2">
                        <Link
                          href={{
                            pathname: "/survey/[slug]",
                            params: { slug: survey.slug },
                          }}
                        >
                          {t("survey.listing.takeSurvey")}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </StoneCard>
              </m.div>
            ))}
          </div>
        )}
      </div>

      <TerrainDivider className="relative z-10" />
    </HeroBackground>
  );
}
