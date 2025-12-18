<template>
  <div class="about-us-page">
    <!-- About Us Hero or Intro Section (Content from your previous 'who-we-are.vue' or similar) -->
    <section class="py-16 md:py-24 bg-brand-light-bg">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-center">About Us</h1>
        <p class="text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto text-center">
          Benchmark Valuers Ltd is a leading real estate valuation and consultancy firm in Kenya,
          providing market-driven solutions to clients across various sectors.
          With years of experience and a team of certified professionals, we deliver accurate,
          reliable, and timely services that meet international standards.
        </p>
        <!-- Additional 'About Us' content like Mission, Vision, Values can go here -->
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mt-16 mb-8 text-center">Our Team</h2>
        <!-- Example structure for team members, adjust based on your TeamMemberCard component -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            <TeamMemberCard name="John Smith" title="Managing Director" image="/images/team-john.jpg" />
            <TeamMemberCard name="Sarah Jones" title="Head of Valuations" image="/images/team-sarah.jpg" />
            <TeamMemberCard name="David Omondi" title="Senior Consultant" image="/images/team-david.jpg" />
            <TeamMemberCard name="Grace Wanjiru" title="Financial Analyst" image="/images/team-grace.jpg" />
        </div>
      </div>
    </section>

    <!-- --- NEW SECTION: Our Valued Partners --- -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Our Valued Partners</h2>
        <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 text-lg text-gray-700">
          <!-- Partners List - Column 1 -->
          <ul class="list-disc list-inside space-y-2">
            <li>Equity Bank (Kenya) Limited</li>
            <li>Co-operative Bank of Kenya Limited</li>
            <li>ABSA Bank Kenya PLC</li>
            <li>NCBA Bank Kenya PLC</li>
            <li>M Oriental Bank Limited</li>
            <li>Family Bank Limited</li>
            <li>Bank of Africa Kenya Limited</li>
            <li>DTB Bank</li>
            <li>Tower Savings and Credit Co-operative Society Limited</li>
            <li>Springboard Capital Ltd</li>
            <li>Juhudi Kilimo Company Ltd</li>
            <li>Rafiki Microfinance Bank Limited</li>
          </ul>
          <!-- Partners List - Column 2 -->
          <ul class="list-disc list-inside space-y-2">
            <li>Pivotal Women’s Sacco</li>
            <li>Muki Sacco Limited</li>
            <li>Dimkes DT Sacco</li>
            <li>K- Unity Sacco Limited</li>
            <li>Nawiri Sacco Limited</li>
            <li>Tai Sacco Society Limited</li>
            <li>Bimas Kenya Limited</li>
            <li>Balozi Sacco Limited</li>
            <li>Sheria Sacco Limited.</li>
            <li>Bandari DT Sacco Ltd.</li>
            <li>United Winners Sacco Society</li>
            <li>PEFA Nairobi Central Sacco</li>
          </ul>
          <!-- Partners List - Column 3 -->
          <ul class="list-disc list-inside space-y-2">
            <li>Shelloyees Sacco Limited</li>
            <li>Stima Investment Cooperative Society</li>
            <li>Chai Sacco Limited</li>
            <li>Incredo Access Solutions Limited</li>
            <li>Nairobi Water Sacco Society Limited</li>
            <li>Strathmore University</li>
            <li>Micro - Cap Holdings Ltd</li>
            <li>KCA University</li>
            <li>Cosmopolitan DT Sacco</li>
            <li>Tamarind Management Ltd</li>
            <li>Coffee Management Services Ltd</li>
            <li>Thika Technical Training Institute</li>
            <li>Competition Authority of Kenya</li>
          </ul>
        </div>
      </div>
    </section>
    <!-- --- END NEW SECTION --- -->

    <!-- Optional: Call to Action Section if desired, similar to index page -->
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4">Want to Partner With Us?</h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Reach out today to explore collaboration opportunities.
        </p>
        <BaseButton to="/contact" text="Contact Us" variant="primary" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta, useRuntimeConfig } from '#imports';
import TeamMemberCard from '~/components/TeamMemberCard.vue'; // Make sure this component exists and is correctly imported

const config = useRuntimeConfig();

useHead({
  title: 'About Us - Benchmark Valuers',
  link: [
    {
      rel: 'canonical',
      href: `${config.public.baseUrl}/about`,
    },
  ],
});

useSeoMeta({
  title: 'About Us - Benchmark Valuers',
  ogTitle: 'About Us - Benchmark Valuers',
  description: 'Learn more about Benchmark Valuers Ltd, a leading real estate valuation and consultancy firm in Kenya, our team, values, and esteemed partners.',
  ogDescription: 'Learn more about Benchmark Valuers Ltd, a leading real estate valuation and consultancy firm in Kenya, our team, values, and esteemed partners.',
  ogImage: `${config.public.baseUrl}/images/about-team-meeting.jpg`,
  ogUrl: `${config.public.baseUrl}/about`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'About Us - Benchmark Valuers',
  twitterDescription: 'Learn more about Benchmark Valuers Ltd, a leading real estate valuation and consultancy firm in Kenya, our team, values, and esteemed partners.',
  twitterImage: `${config.public.baseUrl}/images/about-team-meeting.jpg`,
  twitterCreator: '@BenchmarkValuers',
});
</script>

<style>
/* Any specific styles for about.vue */
</style>