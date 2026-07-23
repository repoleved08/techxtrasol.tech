<script setup>
import caseStudies from '../data/case_studies.json'
import clients from '../data/clients.json'
import faq from '../data/faq.json'
import services from '../data/services.json'
import home from '../data/home.json'
import global_settings from '../data/global_settings.json'
import newsletter from '../data/newsletter.json'
import testimonials from '../data/testimonials.json'
import team from '../data/team.json'
import tech_stack from '../data/tech_stack.json'
import process from '../data/process.json'
import why_choose from '../data/why_choose.json'
import blog from '../data/blog.json'
import stats from '../data/stats.json'
</script>

<template>

  <HeroSection
    :content="home.hero_content"
    :settings="global_settings"
    :title="home.hero_title"
  />

  <StatsSection
    :stats="stats"
    :title="home.stats_title"
  />

  <ServicesCarousel
    :services="services"
    :title="home.services_title"
  />

  <WhyChooseSection
    :items="why_choose"
    :title="home.why_choose_title"
  />

  <CaseStudiesSection
    :caseStudies="caseStudies"
    :title="home.case_studies_title"
  />

  <ProcessSection
    :steps="process"
    :title="home.process_title"
  />

  <ClientsSection
    :clients="clients"
    :title="home.clients_title"
  />

  <QuoteSection
    :cite="home.quote_cite"
    :content="home.quote_content"
    :image="home.quote_image"
    :role="home.quote_role"
  />

  <TechStackSection
    :stack="tech_stack"
    :title="home.tech_stack_title"
  />

  <TeamSection
    :team="team"
    :title="home.team_title"
  />

  <TestimonialsSection
    :testimonials="testimonials"
    :title="home.testimonials_title"
  />

  <BlogSection
    :posts="blog"
    :title="home.blog_title"
  />

  <FaqSection
    :faq="faq"
    :title="home.faq_title"
  />

  <NewsletterSection :newsletter="newsletter" />

</template>
