<script lang="ts">
  import ConferenceCard from '../lib/components/ConferenceCard.svelte';

  const conferences = [
    {
      name: "DevWorld 2025",
      description: "The largest developer conference focusing on emerging technologies, AI, and cloud computing.",
      date: "June 15-17, 2025"
    },
    {
      name: "SvelteCon",
      description: "The premier conference for Svelte developers, featuring workshops and talks from core team members.",
      date: "August 22-24, 2025"
    },
    {
      name: "WebTech Summit",
      description: "Exploring the latest in web technologies, performance optimization, and developer tools.",
      date: "September 10-12, 2025"
    },
    {
      name: "AI Dev Conference",
      description: "Deep dive into artificial intelligence development, machine learning, and practical applications.",
      date: "October 5-7, 2025"
    },
	  {
      name: "React Amsterdan",
      description: "Deep dive into react and react router.",
      date: "December 5-7, 2025"
    },

  ];
</script>

<main class="container mx-auto p-4">
  <h1 class="text-4xl font-bold text-center mb-8">Upcoming Developer Conferences</h1>
  
  <div class="flex flex-wrap justify-center gap-4">
    {#each conferences as conference}
      <ConferenceCard {...conference} />
    {/each}
  </div>
</main>