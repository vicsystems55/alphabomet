<template>
  <div class="contact-page">
    <PageHero
      eyebrow="Contact Alphabomet"
      title="The next opportunity starts with a conversation."
      summary="Connect with the right part of our Group for corporate enquiries, investments, partnerships, careers and media."
      index="06"
      :image="corporateImage"
    />

    <section class="contact-page__intro">
      <div>
        <p class="eyebrow">Connect with us</p>
        <h2>Different ambitions.<br />One place to begin.</h2>
      </div>
      <p>
        Alphabomet works with governments, investors, industries, entrepreneurs and
        communities. Choose the enquiry path that best reflects your interest and our
        team will direct the conversation appropriately.
      </p>
    </section>

    <section class="contact-page__channels">
      <RouterLink v-for="(channel, index) in channels" :key="channel.title" :to="channel.path">
        <span>0{{ index + 1 }}</span>
        <component :is="channel.icon" :size="28" stroke-width="1.35" />
        <div>
          <h2>{{ channel.title }}</h2>
          <p>{{ channel.description }}</p>
        </div>
        <ArrowUpRight :size="21" />
      </RouterLink>
    </section>

    <section class="contact-page__presence">
      <div class="contact-page__presence-heading">
        <p class="eyebrow">Geographic focus</p>
        <h2>African-led.<br />Globally positioned.</h2>
        <p>
          Our footprint begins in Nigeria and expands through regional, continental
          and strategic international markets.
        </p>
      </div>
      <div class="contact-page__presence-grid">
        <article v-for="location in locations" :key="location.level">
          <span>{{ location.level }}</span>
          <h3>{{ location.place }}</h3>
        </article>
      </div>
    </section>

    <section class="contact-page__note">
      <div>
        <p class="eyebrow">Corporate information</p>
        <h2>Official contact details are being prepared.</h2>
      </div>
      <p>
        Verified office addresses, telephone numbers and corporate email channels
        will be published here once supplied. This prevents unverified information
        from appearing on the public website.
      </p>
    </section>

    <section class="page-cta">
      <p class="eyebrow">Explore Alphabomet</p>
      <h2>Discover the enterprises creating Africa's next opportunities.</h2>
      <RouterLink to="/businesses" class="button-gold">
        Our businesses <ArrowRight :size="18" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Handshake,
  MapPin,
  MessageSquareText,
} from "@lucide/vue";
import PageHero from "../components/shared/PageHero.vue";
import corporateImage from "../assets/corporate.jpg";

const channels = [
  {
    icon: MessageSquareText,
    title: "Corporate enquiries",
    description: "General information, media and Group-level correspondence.",
    path: "/contact/contact-us",
  },
  {
    icon: BriefcaseBusiness,
    title: "Careers",
    description: "Explore opportunities across Alphabomet and our portfolio companies.",
    path: "/contact/careers",
  },
  {
    icon: Handshake,
    title: "Partner with us",
    description: "Investment, government, industry and strategic partnership conversations.",
    path: "/contact/partner-with-us",
  },
  {
    icon: MapPin,
    title: "Locations",
    description: "Learn about our geographic focus and growing market presence.",
    path: "/contact/locations",
  },
];

const locations = [
  { level: "Primary", place: "Nigeria" },
  { level: "Regional", place: "West Africa" },
  { level: "Continental", place: "Africa" },
  { level: "Global", place: "Strategic International Markets" },
];
</script>

<style scoped>
.contact-page__intro {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: clamp(3rem, 8vw, 8rem);
  width: min(100% - 3rem, 82rem);
  margin: 0 auto;
  padding: 7rem 0;
}

.contact-page h2 {
  margin: 0;
  color: var(--wine);
  font-family: var(--font-heading);
  font-size: clamp(2.7rem, 5vw, 4.7rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
}

.contact-page__intro > p {
  align-self: end;
  margin: 0;
  color: #655a58;
  line-height: 1.85;
}

.contact-page__channels {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 max(1.5rem, calc((100vw - 82rem) / 2)) 7rem;
}

.contact-page__channels > a {
  position: relative;
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1.6rem;
  min-height: 19rem;
  padding: 2rem;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  transition: 220ms ease;
}

.contact-page__channels > a:nth-child(even) {
  border-right: 1px solid var(--line);
}

.contact-page__channels > a:nth-child(n+3) {
  border-bottom: 1px solid var(--line);
}

.contact-page__channels > a > span {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: rgba(128, 20, 24, 0.42);
  font-size: 0.62rem;
  font-weight: 700;
}

.contact-page__channels > a > svg:first-of-type {
  margin-top: auto;
  color: var(--wine);
}

.contact-page__channels > a > div {
  align-self: end;
}

.contact-page__channels h2 {
  font-size: 2rem;
}

.contact-page__channels p {
  max-width: 25rem;
  margin: 0.8rem 0 0;
  color: #6b605d;
  font-size: 0.78rem;
  line-height: 1.7;
}

.contact-page__channels > a > svg:last-child {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  color: var(--wine);
}

.contact-page__channels > a:hover {
  z-index: 1;
  background: var(--wine);
  box-shadow: 0 1.5rem 3rem rgba(74, 7, 11, 0.18);
  transform: translateY(-0.3rem);
}

.contact-page__channels > a:hover h2,
.contact-page__channels > a:hover > svg {
  color: var(--gold);
}

.contact-page__channels > a:hover p,
.contact-page__channels > a:hover > span {
  color: rgba(248, 244, 238, 0.65);
}

.contact-page__presence {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 5rem;
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  background: var(--wine-deep);
  color: var(--cream);
}

.contact-page__presence .eyebrow {
  color: var(--gold);
}

.contact-page__presence h2 {
  color: var(--cream);
}

.contact-page__presence-heading > p:last-child {
  max-width: 31rem;
  color: rgba(248, 244, 238, 0.62);
  line-height: 1.8;
}

.contact-page__presence-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid rgba(220, 193, 144, 0.18);
  border-left: 1px solid rgba(220, 193, 144, 0.18);
}

.contact-page__presence-grid article {
  min-height: 11rem;
  padding: 1.5rem;
  border-right: 1px solid rgba(220, 193, 144, 0.18);
  border-bottom: 1px solid rgba(220, 193, 144, 0.18);
}

.contact-page__presence-grid span {
  color: rgba(220, 193, 144, 0.65);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-page__presence-grid h3 {
  margin: 3rem 0 0;
  color: var(--gold);
  font-family: var(--font-heading);
  font-size: 1.55rem;
  line-height: 1.1;
}

.contact-page__note {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 5rem;
  width: min(100% - 3rem, 82rem);
  margin: 0 auto;
  padding: 6rem 0;
}

.contact-page__note h2 {
  font-size: clamp(2.2rem, 4vw, 3.5rem);
}

.contact-page__note > p {
  align-self: end;
  margin: 0;
  color: #655a58;
  line-height: 1.8;
}

@media (max-width: 720px) {
  .contact-page__intro,
  .contact-page__presence,
  .contact-page__note { grid-template-columns: 1fr; gap: 2rem; }
  .contact-page__intro,
  .contact-page__note { width: calc(100% - 2.5rem); padding: 5rem 0; }
  .contact-page__channels { grid-template-columns: 1fr; padding-bottom: 5rem; }
  .contact-page__channels > a { min-height: 15rem; border-right: 1px solid var(--line); border-bottom: 0; }
  .contact-page__channels > a:last-child { border-bottom: 1px solid var(--line); }
  .contact-page__presence { padding: 5rem 1.25rem; }
  .contact-page__presence-grid { grid-template-columns: 1fr; }
}
</style>
