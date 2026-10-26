<template>
  <div class="contact-page">
    <PageHero
      class="contact-page__hero"
      eyebrow="Contact Us"
      title="Let's start a meaningful conversation."
      summary="Reach Alphabomet Holdings for corporate enquiries, careers, partnerships and other Group-level conversations."
      index="06"
      :image="corporateImage"
    />

    <section class="contact-page__main">
      <div class="contact-page__information">
        <p class="eyebrow">Contact Alphabomet</p>
        <h2>One place to begin.</h2>
        <p class="contact-page__lead">
          Tell us what you would like to discuss and provide enough context for your
          enquiry to reach the appropriate team.
        </p>

        <address class="contact-page__address">
          <MapPin :size="29" stroke-width="1.35" />
          <div>
            <span>Abuja office</span>
            <strong>{{ officeAddress }}</strong>
          </div>
          <a :href="mapsUrl" target="_blank" rel="noopener noreferrer">
            Get directions <ArrowUpRight :size="16" />
          </a>
        </address>

        <div class="contact-page__topics" aria-label="Enquiry categories">
          <span v-for="topic in enquiryTopics" :key="topic">{{ topic }}</span>
        </div>
      </div>

      <form id="enquiries" class="contact-form" @submit.prevent="submitEnquiry">
        <span id="careers" class="contact-form__anchor" aria-hidden="true"></span>
        <span id="partnerships" class="contact-form__anchor" aria-hidden="true"></span>
        <header>
          <p class="eyebrow">Send an enquiry</p>
          <h2>How can we help?</h2>
          <p>Fields marked with an asterisk are required.</p>
        </header>

        <div class="contact-form__grid">
          <label>
            <span>Full name *</span>
            <input v-model.trim="form.name" name="name" type="text" autocomplete="name" required />
          </label>
          <label>
            <span>Email address *</span>
            <input v-model.trim="form.email" name="email" type="email" autocomplete="email" required />
          </label>
          <label>
            <span>Phone number</span>
            <input v-model.trim="form.phone" name="phone" type="tel" autocomplete="tel" />
          </label>
          <label>
            <span>Organisation</span>
            <input v-model.trim="form.organisation" name="organisation" type="text" autocomplete="organization" />
          </label>
          <label class="contact-form__wide">
            <span>Enquiry type *</span>
            <select v-model="form.enquiryType" name="enquiryType" required>
              <option disabled value="">Select an enquiry type</option>
              <option v-for="topic in enquiryTopics" :key="topic" :value="topic">{{ topic }}</option>
            </select>
          </label>
          <label class="contact-form__wide">
            <span>Message *</span>
            <textarea v-model.trim="form.message" name="message" rows="7" required></textarea>
          </label>
        </div>

        <label class="contact-form__consent">
          <input v-model="form.consent" name="consent" type="checkbox" required />
          <span>I agree to be contacted regarding this enquiry.</span>
        </label>
        <label class="contact-form__trap" aria-hidden="true">
          Website
          <input v-model="form.website" name="website" type="text" tabindex="-1" autocomplete="off" />
        </label>

        <div class="contact-form__footer">
          <button type="submit" :disabled="submitState === 'submitting'">
            {{ submitState === "submitting" ? "Sending..." : "Send enquiry" }}
            <Send :size="17" />
          </button>
          <p
            v-if="statusMessage"
            class="contact-form__status"
            :class="`contact-form__status--${submitState}`"
            role="status"
            aria-live="polite"
          >
            {{ statusMessage }}
          </p>
        </div>
      </form>
    </section>

    <section id="location" class="contact-page__map" aria-labelledby="contact-map-title">
      <div class="contact-page__map-heading">
        <div>
          <p class="eyebrow">Our location</p>
          <h2 id="contact-map-title">Find us in Abuja.</h2>
        </div>
        <p>{{ officeAddress }}</p>
      </div>
      <div class="contact-page__map-frame">
        <iframe
          :src="mapEmbedUrl"
          title="Google Map showing the Alphabomet Holdings office in Abuja, Nigeria"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ArrowUpRight, MapPin, Send } from "@lucide/vue";
import PageHero from "../components/shared/PageHero.vue";
import corporateImage from "../assets/corporate.jpg";

const officeAddress = "B2, Mikuch Ville Estate, Phase 4, Gaduwa, Gudu District, FCT-Abuja";
const encodedAddress = encodeURIComponent(officeAddress);
const mapEmbedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
const formEndpoint = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "").trim();

const enquiryTopics = [
  "General enquiry",
  "Careers",
  "Partnerships and investment",
  "Media and communications",
];

const emptyForm = () => ({
  name: "",
  email: "",
  phone: "",
  organisation: "",
  enquiryType: "",
  message: "",
  consent: false,
  website: "",
});

const form = reactive(emptyForm());
const submitState = ref("idle");
const statusMessage = ref("");
const route = useRoute();

watch(
  () => route.hash,
  (hash) => {
    if (hash === "#careers") form.enquiryType = "Careers";
    if (hash === "#partnerships") form.enquiryType = "Partnerships and investment";
  },
  { immediate: true },
);

const submitEnquiry = async () => {
  if (form.website) {
    submitState.value = "success";
    statusMessage.value = "Thank you. Your enquiry has been received.";
    return;
  }

  if (!formEndpoint) {
    submitState.value = "configuration";
    statusMessage.value = "Online delivery is not configured yet, so your message has not been sent.";
    return;
  }

  submitState.value = "submitting";
  statusMessage.value = "";

  try {
    const response = await fetch(formEndpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        organisation: form.organisation,
        enquiryType: form.enquiryType,
        message: form.message,
        office: officeAddress,
        source: "Alphabomet Holdings website",
      }),
    });

    if (!response.ok) throw new Error(`Contact request failed with ${response.status}`);

    Object.assign(form, emptyForm());
    submitState.value = "success";
    statusMessage.value = "Thank you. Your enquiry has been sent successfully.";
  } catch {
    submitState.value = "error";
    statusMessage.value = "We could not send your enquiry. Please try again after a short while.";
  }
};
</script>

<style scoped>
.contact-page__hero {
  min-height: 38rem;
  padding-bottom: 5rem;
}

.contact-page__main {
  display: grid;
  grid-template-columns: .82fr 1.18fr;
  gap: clamp(3rem, 8vw, 8rem);
  width: min(100% - 3rem, 82rem);
  margin: 0 auto;
  padding: 7rem 0;
}

.contact-page h2 {
  margin: 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: clamp(2.7rem, 5vw, 4.7rem);
  font-weight: 600;
  letter-spacing: -.03em;
  line-height: 1;
}

.contact-page__information { align-self: start; }

.contact-page__lead {
  max-width: 34rem;
  margin: 1.6rem 0 0;
  color: var(--text-secondary);
  line-height: 1.85;
}

.contact-page__address {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.2rem;
  margin-top: 3rem;
  padding: 1.6rem;
  border: 1px solid rgba(220, 193, 144, .24);
  background: var(--wine-deep);
  color: var(--cream);
  font-style: normal;
}

.contact-page__address > svg {
  margin-top: .2rem;
  color: var(--gold);
}

.contact-page__address span,
.contact-page__address strong { display: block; }

.contact-page__address span {
  color: rgba(248, 244, 238, .58);
  font-size: .6rem;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.contact-page__address strong {
  margin-top: .55rem;
  color: var(--cream);
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.35;
}

.contact-page__address a {
  grid-column: 2;
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  width: fit-content;
  margin-top: .25rem;
  color: var(--gold);
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.contact-page__topics {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin-top: 2rem;
}

.contact-page__topics span {
  padding: .65rem .8rem;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: .58rem;
  font-weight: 600;
  letter-spacing: .05em;
  text-transform: uppercase;
}

.contact-form {
  position: relative;
  padding: clamp(1.5rem, 4vw, 3rem);
  border: 1px solid var(--border-subtle);
  background: var(--surface-secondary);
  box-shadow: 0 1.5rem 4rem var(--shadow-surface);
  scroll-margin-top: 7rem;
}

.contact-form__anchor {
  position: absolute;
  top: 0;
  left: 0;
}

.contact-form header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.8rem;
  border-bottom: 1px solid var(--border-subtle);
}

.contact-form header h2 { font-size: clamp(2.3rem, 4vw, 3.5rem); }

.contact-form header > p:last-child {
  margin: .8rem 0 0;
  color: var(--text-tertiary);
  font-size: .72rem;
}

.contact-form__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.contact-form label {
  display: grid;
  gap: .55rem;
}

.contact-form label > span {
  color: var(--text-secondary);
  font-size: .64rem;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
}

.contact-form input,
.contact-form select,
.contact-form textarea {
  width: 100%;
  border: 1px solid var(--border-medium);
  border-radius: 0;
  outline: 0;
  background: var(--surface-primary);
  color: var(--text-primary);
  color-scheme: inherit;
  font: inherit;
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.contact-form input,
.contact-form select {
  min-height: 3.35rem;
  padding: 0 .9rem;
}

.contact-form textarea {
  min-height: 10rem;
  padding: .9rem;
  resize: vertical;
}

.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  border-color: var(--wine);
  box-shadow: 0 0 0 3px rgba(128, 20, 24, .1);
}

.contact-form__wide { grid-column: 1 / -1; }

.contact-form__consent {
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-top: 1.25rem;
}

.contact-form__consent input {
  width: 1rem;
  min-height: auto;
  height: 1rem;
  accent-color: var(--wine);
}

.contact-form__consent span {
  letter-spacing: 0 !important;
  text-transform: none !important;
}

.contact-form__trap {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.contact-form__footer {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 1.8rem;
}

.contact-form__footer button {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: .7rem;
  min-height: 3.35rem;
  padding: 0 1.25rem;
  border: 1px solid var(--wine);
  background: var(--wine);
  color: #ffffff;
  font-size: .64rem;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  cursor: pointer;
  transition: 180ms ease;
}

.contact-form__footer button:hover:not(:disabled) {
  background: var(--wine-deep);
  transform: translateY(-2px);
}

.contact-form__footer button:disabled {
  cursor: wait;
  opacity: .65;
}

.contact-form__status {
  margin: 0;
  color: var(--text-secondary);
  font-size: .7rem;
  line-height: 1.55;
}

.contact-form__status--success { color: #2e6b4e; }
.contact-form__status--error,
.contact-form__status--configuration { color: var(--wine); }

.contact-page__map {
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  background: var(--surface-secondary);
  scroll-margin-top: 6rem;
}

.contact-page__map-heading {
  display: grid;
  grid-template-columns: 1fr .7fr;
  gap: clamp(2rem, 7vw, 7rem);
  align-items: end;
  margin-bottom: 3rem;
}

.contact-page__map-heading > p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.75;
}

.contact-page__map-frame {
  height: clamp(28rem, 58vw, 42rem);
  overflow: hidden;
  border: 1px solid var(--border-medium);
  background: var(--surface-primary);
}

.contact-page__map-frame iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  filter: saturate(.82) contrast(1.04);
}

@media (max-width: 850px) {
  .contact-page__main,
  .contact-page__map-heading { grid-template-columns: 1fr; }
  .contact-page__main { gap: 4rem; padding: 5rem 0; }
  .contact-page__information { max-width: 42rem; }
  .contact-page__map { padding-top: 5rem; padding-bottom: 5rem; }
}

@media (max-width: 560px) {
  .contact-page__main { width: calc(100% - 2.5rem); }
  .contact-form { padding: 1.25rem; }
  .contact-form__grid { grid-template-columns: 1fr; }
  .contact-form__wide { grid-column: auto; }
  .contact-form__footer { align-items: flex-start; flex-direction: column; }
  .contact-page__address { grid-template-columns: 1fr; }
  .contact-page__address a { grid-column: 1; }
  .contact-page__map { padding-right: 1.25rem; padding-left: 1.25rem; }
  .contact-page__map-frame { height: 28rem; }
}
</style>
