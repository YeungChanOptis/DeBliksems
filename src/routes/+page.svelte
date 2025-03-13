<script lang="ts">
  import ConferenceCard from '../lib/components/ConferenceCard.svelte';

  const conferences = [
    {
      name: "DevWorld 2025",
      description: "The largest developer conference focusing on emerging technologies, AI, and cloud computing.",
      date: "June 15-17, 2025",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "SvelteCon",
      description: "The premier conference for Svelte developers, featuring workshops and talks from core team members.",
      date: "August 22-24, 2025",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "WebTech Summit",
      description: "Exploring the latest in web technologies, performance optimization, and developer tools.",
      date: "September 10-12, 2025",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "AI Dev Conference",
      description: "Deep dive into artificial intelligence development, machine learning, and practical applications.",
      date: "October 5-7, 2025",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
    }
  ];
</script>

<div class="container mx-auto p-4">
  <h1 class="text-4xl font-bold text-center mb-8">Upcoming Developer Conferences</h1>
  
  <div class="flex flex-wrap justify-center gap-4">
    {#each conferences as conference}
      <ConferenceCard {...conference} />
    {/each}
    }
  </div>
</div>
