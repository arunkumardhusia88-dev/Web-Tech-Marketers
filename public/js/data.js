/**
 * Veltrix Growth — Initial Agency Content & Structured Seed Data
 * Defines all 22 services, 6 portfolio case studies, 3 pricing plans,
 * 4 highlights, 4 process steps, 4 testimonials, 10 FAQs, blog posts,
 * SEO configuration, and site-wide settings.
 */
(function (global) {
  'use strict';

  function createServiceItem(config) {
    return {
      id: config.id,
      slug: config.slug,
      title: config.title,
      category: config.category,
      icon: config.icon || 'chart',
      image: config.image || '/images/banners/hero-agency.jpg',
      shortDescription: config.shortDescription,
      headline: config.headline || config.title + ' built for measurable pipeline growth',
      overview: config.overview || config.shortDescription + ' Our senior strategists and automation engineers build repeatable acquisition and conversion infrastructure tailored to your revenue model.',
      problems: config.problems || [
        'Rising customer acquisition costs without clear attribution across channels',
        'Disconnected spreadsheets and manual follow-ups causing qualified leads to go cold',
        'Inconsistent campaign execution lacking weekly conversion telemetry'
      ],
      solutions: config.solutions || [
        'Full-funnel tracking and attribution wired directly into your CRM',
        'Automated qualification, routing, and multi-channel follow-up workflows',
        'Iterative creative, landing page, and bidding optimization based on revenue data'
      ],
      benefits: config.benefits || [
        'Lower cost per qualified opportunity within 60 days',
        '24/7 automated lead capture and response under 30 seconds',
        'Transparent executive reporting tied to booked revenue'
      ],
      features: config.features || [
        'Dedicated Growth Strategist & Automation Architect',
        'Bi-weekly sprint reviews and live KPI dashboards',
        'Custom CRM webhook and calendar booking integration',
        'Conversion copywriting and A/B landing page testing'
      ],
      faqs: config.faqs || [
        {
          q: 'How long does onboarding and initial launch take for ' + config.title + '?',
          a: 'Discovery, technical tracking audits, and core system setup are completed within 10 to 14 business days, with live campaigns or workflows running by week three.'
        },
        {
          q: 'Do you integrate with our existing CRM and ad accounts?',
          a: 'Yes. You retain full ownership of all ad accounts, domains, and CRM data. We connect directly with HubSpot, Salesforce, Pipedrive, GoHighLevel, and custom webhooks.'
        }
      ],
      pricingNote: config.pricingNote || 'Included in Growth & Scale retainers, or available in our Launch Plan starting at ₹9,999/mo.',
      seoTitle: config.seoTitle || config.title + ' Services | Webluxe Agency',
      seoDescription: config.seoDescription || config.shortDescription + ' Partner with Webluxe for measurable ROI and automated execution.',
      status: 'published',
      order: config.order
    };
  }

  var SERVICES_LIST = [
    // DIGITAL MARKETING (10)
    createServiceItem({
      id: 'srv-1',
      slug: 'seo-optimization',
      title: 'SEO Optimization',
      category: 'Digital Marketing',
      icon: 'search',
      image: '/images/portfolio/saas-pipeline.jpg',
      shortDescription: 'Technical site architecture, search intent mapping, and authority content that compounds organic pipeline.',
      headline: 'Technical & Revenue-Focused SEO Optimization',
      overview: 'We restructure crawl architecture, target high-intent commercial keywords, and deploy programmatic and editorial content clusters that capture ready-to-buy search traffic.',
      problems: [
        'Organic traffic stalls on informational blog posts that never convert into sales calls',
        'Core Web Vitals bottlenecks and crawl errors prevent key service pages from ranking',
        'Competitors dominate high-margin commercial comparison and solution keywords'
      ],
      solutions: [
        'Complete technical audit covering schema markup, internal link equity, and speed optimization',
        'Bottom-of-funnel keyword mapping aligned directly to buyer pain points',
        'High-authority digital PR and editorial content velocity tracked against CRM pipeline'
      ],
      order: 1
    }),
    createServiceItem({
      id: 'srv-2',
      slug: 'local-seo',
      title: 'Local SEO',
      category: 'Digital Marketing',
      icon: 'map',
      image: '/images/portfolio/healthcare-voice.jpg',
      shortDescription: 'Google Business Profile optimization, local citations, and geo-targeted landing pages for regional dominance.',
      headline: 'Capture High-Intent Local Search & Map Pack Calls',
      shortDescription: 'Google Business Profile optimization, local citations, and geo-targeted landing pages for regional dominance.',
      order: 2
    }),
    createServiceItem({
      id: 'srv-3',
      slug: 'social-media-marketing',
      title: 'Social Media Marketing',
      category: 'Digital Marketing',
      icon: 'share',
      image: '/images/team/agency-team.jpg',
      shortDescription: 'Executive thought leadership, short-form video systems, and community engagement engineered for brand demand.',
      order: 3
    }),
    createServiceItem({
      id: 'srv-4',
      slug: 'google-ads-management',
      title: 'Google Ads Management',
      category: 'Digital Marketing',
      icon: 'target',
      image: '/images/portfolio/saas-pipeline.jpg',
      shortDescription: 'High-intent Search, Shopping, and Performance Max campaigns calibrated to closed-won revenue rather than vanity clicks.',
      order: 4
    }),
    createServiceItem({
      id: 'srv-5',
      slug: 'meta-ads-management',
      title: 'Meta Ads Management',
      category: 'Digital Marketing',
      icon: 'layers',
      image: '/images/portfolio/ecommerce-ai.jpg',
      shortDescription: 'Creative testing sprints and server-side Conversion API tracking across Facebook and Instagram.',
      order: 5
    }),
    createServiceItem({
      id: 'srv-6',
      slug: 'youtube-marketing',
      title: 'YouTube Marketing',
      category: 'Digital Marketing',
      icon: 'video',
      image: '/images/banners/hero-agency.jpg',
      shortDescription: 'Video search optimization and direct-response YouTube ad funnels that educate buyers before they book.',
      order: 6
    }),
    createServiceItem({
      id: 'srv-7',
      slug: 'content-marketing',
      title: 'Content Marketing',
      category: 'Digital Marketing',
      icon: 'file',
      image: '/images/blog/ai-workflows.jpg',
      shortDescription: 'Case studies, technical whitepapers, and conversion assets that shorten complex B2B sales cycles.',
      order: 7
    }),
    createServiceItem({
      id: 'srv-8',
      slug: 'email-marketing',
      title: 'Email Marketing',
      category: 'Digital Marketing',
      icon: 'mail',
      image: '/images/portfolio/ecommerce-ai.jpg',
      shortDescription: 'Segmented lifecycle flows, abandoned cart recovery, and outbound nurture sequences with measurable lift.',
      order: 8
    }),
    createServiceItem({
      id: 'srv-9',
      slug: 'lead-generation',
      title: 'Lead Generation',
      category: 'Digital Marketing',
      icon: 'users',
      image: '/images/portfolio/saas-pipeline.jpg',
      shortDescription: 'Multi-channel outbound and paid inbound systems built to keep sales calendars filled with qualified buyers.',
      order: 9
    }),
    createServiceItem({
      id: 'srv-10',
      slug: 'conversion-rate-optimization',
      title: 'Conversion Rate Optimization',
      category: 'Digital Marketing',
      icon: 'trending',
      image: '/images/banners/hero-agency.jpg',
      shortDescription: 'Heatmap diagnostics, multivariate A/B testing, and checkout friction removal to increase revenue per visitor.',
      order: 10
    }),

    // AI AUTOMATION (8)
    createServiceItem({
      id: 'srv-11',
      slug: 'ai-chatbot-development',
      title: 'AI Chatbot Development',
      category: 'AI Automation',
      icon: 'bot',
      image: '/images/banners/hero-agency.jpg',
      shortDescription: 'Custom LLM assistants trained on your knowledge base to resolve support tickets and book sales meetings 24/7.',
      headline: 'Custom AI Chatbots That Qualify & Book Revenue Around the Clock',
      order: 11
    }),
    createServiceItem({
      id: 'srv-12',
      slug: 'whatsapp-automation',
      title: 'WhatsApp Automation',
      category: 'AI Automation',
      icon: 'message',
      image: '/images/portfolio/healthcare-voice.jpg',
      shortDescription: 'Official WhatsApp Business API bots for instant enquiry handling, appointment reminders, and order updates.',
      order: 12
    }),
    createServiceItem({
      id: 'srv-13',
      slug: 'crm-automation',
      title: 'CRM Automation',
      category: 'AI Automation',
      icon: 'database',
      image: '/images/portfolio/saas-pipeline.jpg',
      shortDescription: 'Automated pipeline stages, lead enrichment, deal scoring, and task triggers in HubSpot, Salesforce, and Pipedrive.',
      order: 13
    }),
    createServiceItem({
      id: 'srv-14',
      slug: 'ai-workflow-automation',
      title: 'AI Workflow Automation',
      category: 'AI Automation',
      icon: 'cpu',
      image: '/images/blog/ai-workflows.jpg',
      shortDescription: 'End-to-end Make, n8n, and custom API automations connecting marketing tools, invoicing, and internal ops.',
      order: 14
    }),
    createServiceItem({
      id: 'srv-15',
      slug: 'ai-voice-agents',
      title: 'AI Voice Agents',
      category: 'AI Automation',
      icon: 'phone',
      image: '/images/portfolio/healthcare-voice.jpg',
      shortDescription: 'Low-latency conversational voice agents for inbound reception, appointment scheduling, and outbound qualification.',
      order: 15
    }),
    createServiceItem({
      id: 'srv-16',
      slug: 'business-process-automation',
      title: 'Business Process Automation',
      category: 'AI Automation',
      icon: 'settings',
      image: '/images/team/agency-team.jpg',
      shortDescription: 'Eliminate repetitive manual data entry across client onboarding, document parsing, and reporting.',
      order: 16
    }),
    createServiceItem({
      id: 'srv-17',
      slug: 'ai-lead-qualification',
      title: 'AI Lead Qualification',
      category: 'AI Automation',
      icon: 'filter',
      image: '/images/portfolio/saas-pipeline.jpg',
      shortDescription: 'Instant scoring, firmographic enrichment, and personalized outreach triggered within seconds of form submission.',
      order: 17
    }),
    createServiceItem({
      id: 'srv-18',
      slug: 'marketing-automation',
      title: 'Marketing Automation',
      category: 'AI Automation',
      icon: 'zap',
      image: '/images/portfolio/ecommerce-ai.jpg',
      shortDescription: 'Behavior-triggered multi-channel journeys linking email, SMS, WhatsApp, and retargeting audiences.',
      order: 18
    }),

    // WEB DEVELOPMENT (4)
    createServiceItem({
      id: 'srv-19',
      slug: 'business-website-development',
      title: 'Business Website Development',
      category: 'Web Development',
      icon: 'globe',
      image: '/images/banners/hero-agency.jpg',
      shortDescription: 'Fast, SEO-engineered corporate websites built for brand authority, accessibility, and lead conversion.',
      order: 19
    }),
    createServiceItem({
      id: 'srv-20',
      slug: 'landing-page-development',
      title: 'Landing Page Development',
      category: 'Web Development',
      icon: 'layout',
      image: '/images/portfolio/saas-pipeline.jpg',
      shortDescription: 'High-converting campaign landing pages engineered with message-match copy and sub-second load speeds.',
      order: 20
    }),
    createServiceItem({
      id: 'srv-21',
      slug: 'ecommerce-website-development',
      title: 'E-commerce Website Development',
      category: 'Web Development',
      icon: 'bag',
      image: '/images/portfolio/ecommerce-ai.jpg',
      shortDescription: 'Custom Shopify and headless storefronts engineered for high average order value and streamlined checkout.',
      order: 21
    }),
    createServiceItem({
      id: 'srv-22',
      slug: 'website-maintenance',
      title: 'Website Maintenance',
      category: 'Web Development',
      icon: 'shield',
      image: '/images/blog/ai-workflows.jpg',
      shortDescription: 'Proactive security monitoring, Core Web Vitals optimization, uptime backups, and rapid content updates.',
      order: 22
    })
  ];

  var PORTFOLIO_LIST = [
    {
      id: 'prj-1',
      slug: 'solis-botanicals-ecommerce-scaling',
      title: 'Solis Botanicals D2C Revenue Scaling',
      industry: 'D2C Skincare',
      category: 'Digital Marketing',
      coverImage: '/images/portfolio/ecommerce-ai.jpg',
      gallery: [
        '/images/portfolio/ecommerce-ai.jpg',
        '/images/banners/promo-banner.jpg',
        '/images/blog/ai-workflows.jpg'
      ],
      shortDescription: 'Rebuilt Meta Conversion API attribution, lifecycle email flows, and checkout UX for a luxury skincare brand.',
      result: '+168% Net Revenue in 6 Months',
      clientOverview: 'Solis Botanicals is a fast-growing clean skincare brand selling across North America and the UK with 18 core SKUs.',
      introduction: 'Facing rising Meta CPMs and stagnant repeat purchase rates, Solis partnered with Webluxe to overhaul paid acquisition and retention automation.',
      challenges: [
        'iOS privacy updates caused a 35% blind spot in Meta purchase attribution',
        'Cart abandonment rate exceeded 74% on mobile checkout',
        'Post-purchase email sequences were generic and untargeted by skin profile'
      ],
      objectives: [
        'Restore 95%+ server-side conversion tracking accuracy',
        'Scale profitable paid social spend while holding ROAS above 3.8x',
        'Increase 90-day customer repeat purchase rate by 40%'
      ],
      strategy: 'We implemented server-side Meta CAPI paired with quiz-based zero-party data capture and automated Klaviyo + WhatsApp replenishment flows.',
      servicesDelivered: ['Meta Ads Management', 'Email Marketing', 'Conversion Rate Optimization', 'Marketing Automation'],
      executionProcess: [
        'Week 1-2: Server-side tracking, GA4 ecommerce events, and checkout speed audit',
        'Week 3-6: Modular UGC creative sprints and high-intent dynamic product retargeting',
        'Week 7-16: Automated skin-quiz segmentation and VIP replenishment sequences'
      ],
      results: [
        '+168% net online revenue growth over 6 months',
        '4.3x blended return on ad spend (ROAS) at $85k/mo spend',
        '-29% reduction in mobile cart abandonment'
      ],
      seoTitle: 'Solis Botanicals Case Study (+168% Revenue) | Webluxe',
      seoDescription: 'How Webluxe scaled Solis Botanicals D2C skincare revenue by 168% in 6 months through Meta CAPI and retention automation.',
      status: 'published'
    },
    {
      id: 'prj-2',
      slug: 'meridian-cloud-b2b-ai-pipeline',
      title: 'Meridian Cloud B2B Pipeline & AI Qualification',
      industry: 'B2B FinTech SaaS',
      category: 'AI Automation',
      coverImage: '/images/portfolio/saas-pipeline.jpg',
      gallery: [
        '/images/portfolio/saas-pipeline.jpg',
        '/images/banners/hero-agency.jpg',
        '/images/team/agency-team.jpg'
      ],
      shortDescription: 'Deployed AI lead scoring, instant enrichment, and HubSpot routing alongside Google Search acquisition.',
      result: '+140% Qualified Demos in 90 Days',
      clientOverview: 'Meridian Cloud provides treasury automation software for mid-market finance teams across 14 countries.',
      introduction: 'Their SDR team was overwhelmed by unqualified demo requests while enterprise buyers waited over 18 hours for a response.',
      challenges: [
        'Slow manual lead research led to 18-hour average speed-to-lead',
        '46% of paid search budget went to non-enterprise small-business clicks',
        'No automated routing between regional account executives'
      ],
      objectives: [
        'Reduce speed-to-lead from 18 hours to under 60 seconds',
        'Double qualified enterprise demo volume without expanding SDR headcount',
        'Align Google Ads bidding directly to HubSpot SQL stages'
      ],
      strategy: 'Connected Google Ads offline conversion imports to HubSpot, paired with an AI enrichment agent that scores company revenue and books AE calendars instantly.',
      servicesDelivered: ['AI Lead Qualification', 'CRM Automation', 'Google Ads Management', 'Landing Page Development'],
      executionProcess: [
        'Audit of historical closed-won deal attributes and search terms',
        'Built n8n + LLM enrichment pipeline synced with HubSpot and Slack',
        'Launched dedicated enterprise vertical landing pages with instant calendar routing'
      ],
      results: [
        '+140% SQL pipeline volume within 90 days',
        '38-second median lead qualification & booking response',
        '-34% lower cost per enterprise opportunity'
      ],
      seoTitle: 'Meridian Cloud Case Study (+140% Demos) | Webluxe',
      seoDescription: 'B2B FinTech pipeline acceleration with AI lead qualification, HubSpot CRM automation, and Google Ads offline conversion bidding.',
      status: 'published'
    },
    {
      id: 'prj-3',
      slug: 'harborview-medical-ai-voice-whatsapp',
      title: 'Harborview Clinics AI Voice & WhatsApp Triage',
      industry: 'Private Healthcare',
      category: 'AI Automation',
      coverImage: '/images/portfolio/healthcare-voice.jpg',
      gallery: [
        '/images/portfolio/healthcare-voice.jpg',
        '/images/team/agency-team.jpg',
        '/images/banners/promo-banner.jpg'
      ],
      shortDescription: 'Implemented multilingual AI voice reception and WhatsApp appointment reminders across 7 clinic locations.',
      result: '92% Call Answer Rate & -41% No-Shows',
      clientOverview: 'Harborview Medical operates seven outpatient diagnostic and specialist clinics handling 4,500+ monthly patient bookings.',
      introduction: 'Front-desk teams missed 38% of peak-hour calls, resulting in lost patient bookings and high appointment no-show rates.',
      challenges: [
        'Missed inbound calls during morning peaks caused immediate patient drop-off',
        'Manual phone confirmations consumed 25 staff hours per week',
        'Fragmented local search presence across 7 regional clinic branches'
      ],
      objectives: [
        'Achieve 90%+ first-ring call handling 24/7',
        'Cut appointment no-shows via automated WhatsApp confirmations',
        'Rank all 7 clinic locations in the local Google Map Pack'
      ],
      strategy: 'Deployed custom AI voice receptionists integrated with clinic scheduling calendars, supported by automated WhatsApp reminders and Local SEO.',
      servicesDelivered: ['AI Voice Agents', 'WhatsApp Automation', 'Local SEO', 'AI Chatbot Development'],
      executionProcess: [
        'Mapped patient FAQ intents and privacy-safe booking handoff protocols',
        'Trained and tested conversational voice & WhatsApp scheduling flows',
        'Optimized Google Business Profiles and location landing pages for all 7 clinics'
      ],
      results: [
        '92% inbound call answer rate around the clock',
        '41% reduction in missed appointments within 60 days',
        '+215% organic Map Pack direction & call actions'
      ],
      seoTitle: 'Harborview Clinics AI Voice Case Study | Webluxe',
      seoDescription: 'How AI voice agents and WhatsApp automation helped Harborview Clinics reach a 92% call answer rate and cut no-shows by 41%.',
      status: 'published'
    },
    {
      id: 'prj-4',
      slug: 'northstar-logistics-seo-web-overhaul',
      title: 'Northstar Freight SEO & Conversion Website',
      industry: 'Supply Chain & Logistics',
      category: 'Web Development',
      coverImage: '/images/banners/hero-agency.jpg',
      gallery: [
        '/images/banners/hero-agency.jpg',
        '/images/portfolio/saas-pipeline.jpg',
        '/images/blog/ai-workflows.jpg'
      ],
      shortDescription: 'Built a sub-second corporate web platform and programmatic lane SEO hub driving inbound freight RFPs.',
      result: '+310% Organic RFP Inquiries',
      clientOverview: 'Northstar Logistics manages cross-border cold-chain freight for food and pharmaceutical manufacturers.',
      introduction: 'Their legacy website took 5.2 seconds to load and generated fewer than 8 inbound quote requests per month.',
      challenges: [
        'Outdated CMS architecture with poor mobile usability and zero structured schema',
        'No dedicated pages for high-intent shipping lanes or industry compliance',
        'Quote request form required 19 mandatory fields, causing 80% drop-off'
      ],
      objectives: [
        'Achieve 98+ Lighthouse performance score across desktop and mobile',
        'Launch 40+ lane and cold-chain compliance landing pages',
        'Triple inbound RFP submissions within two quarters'
      ],
      strategy: 'Engineered a lightweight custom web platform with multi-step progressive quote capture and structured Service schema.',
      servicesDelivered: ['Business Website Development', 'SEO Optimization', 'Conversion Rate Optimization', 'CRM Automation'],
      executionProcess: [
        'Information architecture redesign and technical SEO keyword mapping',
        'Custom responsive frontend build with instant lane quote calculator',
        'Automated Pipedrive deal creation with instant PDF rate summary emails'
      ],
      results: [
        '+310% increase in qualified inbound RFP submissions',
        '0.7s First Contentful Paint globally',
        '42 first-page Google rankings for commercial freight terms'
      ],
      seoTitle: 'Northstar Logistics Web & SEO Case Study | Webluxe',
      seoDescription: 'Sub-second corporate web architecture and technical SEO driving +310% organic RFP inquiries for Northstar Freight.',
      status: 'published'
    },
    {
      id: 'prj-5',
      slug: 'kestrel-wealth-content-lead-engine',
      title: 'Kestrel Wealth Advisory Lead Generation Engine',
      industry: 'Financial Advisory',
      category: 'Digital Marketing',
      coverImage: '/images/blog/ai-workflows.jpg',
      gallery: [
        '/images/blog/ai-workflows.jpg',
        '/images/team/agency-team.jpg',
        '/images/portfolio/saas-pipeline.jpg'
      ],
      shortDescription: 'Combined YouTube educational funnels, high-intent search, and automated portfolio audit scheduling.',
      result: '$4.2M New AUM Pipeline in 5 Months',
      clientOverview: 'Kestrel Wealth advises tech executives and founders on equity compensation and tax-efficient wealth planning.',
      introduction: 'Relying solely on word-of-mouth referrals capped annual growth; Kestrel needed a predictable digital authority funnel.',
      challenges: [
        'High skepticism among executive prospects toward generic financial ads',
        'Long 4-month consideration window requiring consistent nurturing',
        'Compliance constraints on advertising copy and automated messaging'
      ],
      objectives: [
        'Build an evergreen educational funnel for equity-holding executives',
        'Generate 35+ qualified discovery consultations per month',
        'Maintain strict compliance review across every campaign asset'
      ],
      strategy: 'Launched targeted YouTube deep-dive briefings paired with Google Search ads and automated 6-week email research digests.',
      servicesDelivered: ['YouTube Marketing', 'Content Marketing', 'Google Ads Management', 'Email Marketing'],
      executionProcess: [
        'Produced compliance-approved executive tax briefing video series',
        'Built interactive equity tax estimator landing page',
        'Wired automated calendar qualification and advisor briefing notes'
      ],
      results: [
        '$4.2M qualified advisory pipeline in 5 months',
        '4.6% landing page visitor-to-booked-call conversion rate',
        '48% email open rate across 6-week nurture cohorts'
      ],
      seoTitle: 'Kestrel Wealth Lead Generation Case Study | Webluxe',
      seoDescription: 'How Kestrel Wealth generated $4.2M in qualified advisory pipeline in 5 months with YouTube, Search, and lifecycle automation.',
      status: 'published'
    },
    {
      id: 'prj-6',
      slug: 'apex-industrial-ai-onboarding-ops',
      title: 'Apex Industrial AI Document & Onboarding Ops',
      industry: 'Industrial Equipment',
      category: 'AI Automation',
      coverImage: '/images/team/agency-team.jpg',
      gallery: [
        '/images/team/agency-team.jpg',
        '/images/banners/promo-banner.jpg',
        '/images/portfolio/saas-pipeline.jpg'
      ],
      shortDescription: 'Automated vendor onboarding, specification PDF parsing, and distributor quote workflows via custom AI pipelines.',
      result: '32 Hours Saved Weekly Per Ops Team',
      clientOverview: 'Apex Industrial supplies precision pneumatic components to over 220 regional distributors.',
      introduction: 'Operations staff manually re-keyed PDF purchase orders and distributor spec sheets into ERP and CRM systems every day.',
      challenges: [
        'Manual PDF quote extraction took 45 minutes per multi-line order',
        'Human transcription errors caused shipment delays and credit memos',
        'Zero automated status updates back to distributor buyers'
      ],
      objectives: [
        'Automate 90%+ of incoming specification and PO parsing',
        'Sync validated order lines straight into ERP and HubSpot',
        'Deliver instant automated status notifications via email and WhatsApp'
      ],
      strategy: 'Engineered a human-in-the-loop AI workflow pipeline that extracts structured line items, validates SKU pricing, and routes exceptions.',
      servicesDelivered: ['Business Process Automation', 'AI Workflow Automation', 'CRM Automation', 'WhatsApp Automation'],
      executionProcess: [
        'Benchmarked extraction accuracy on 500 historical distributor POs',
        'Built webhook validation engine with instant Slack exception alerts',
        'Rolled out automated distributor portal notifications'
      ],
      results: [
        '32 hours saved every week across the operations desk',
        '99.1% SKU extraction accuracy across 220 distributors',
        '4x faster quote turnaround time'
      ],
      seoTitle: 'Apex Industrial AI Workflow Case Study | Webluxe',
      seoDescription: 'Automated distributor quote parsing and ERP/CRM sync saving 32 hours weekly for Apex Industrial.',
      status: 'published'
    }
  ];

  var DEFAULT_DATA = {
    settings: {
      websiteName: 'Webluxe',
      logoText: 'Webluxe',
      logoMark: 'W',
      faviconUrl: '',
      primaryColor: '#6C2BD9',
      secondaryColor: '#FF4D6D',
      cyanColor: '#FFC300',
      contactEmail: 'webluxeadmin@gmail.com',
      phoneNumber: '9115277587',
      whatsappNumber: '919115277587',
      businessAddress: '131 Sulem Sarai, Prayagraj',
      currency: '₹',
      defaultSeoTitle: 'WEBLUXE | Digital Marketing, SEO & AI Automation Agency',
      defaultSeoDescription: 'Grow your business with WEBLUXE, a digital marketing agency offering SEO, Google Ads, social media marketing, website development and AI automation solutions.',
      defaultSeoKeywords: 'webluxe, digital marketing agency, ai automation agency, seo optimization, google ads, social media marketing, website development',
      footerCopyright: '© 2026 Webluxe. All rights reserved.',
      mapsEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=81.750%2C25.425%2C81.815%2C25.465&layer=mapnik',
      visitorCount: 14820
    },
    navbar: {
      links: [
        { id: 'nav-1', label: 'Home', url: '/index.html' },
        { id: 'nav-2', label: 'About', url: '/about.html' },
        { id: 'nav-3', label: 'Portfolio', url: '/index.html#portfolio' },
        { id: 'nav-4', label: 'Pricing', url: '/pricing.html' },
        { id: 'nav-5', label: 'Blog', url: '/blog.html' },
        { id: 'nav-6', label: 'Contact', url: '/contact.html' }
      ],
      ctaLabel: 'Get Free Consultation',
      ctaUrl: '/contact.html'
    },
    hero: {
      eyebrow: 'Digital Marketing & AI Automation Agency',
      headline: 'Digital Marketing & AI Automation Agency for Business Growth',
      headlineHighlight: 'for Business Growth',
      description: 'WEBLUXE is a results-driven digital marketing agency helping businesses grow online through SEO, performance marketing, social media management, website development, and AI-powered automation. We build smarter marketing strategies that attract the right audience, generate quality leads, and turn digital opportunities into business growth.',
      primaryCtaText: 'Get Free Consultation',
      primaryCtaUrl: '#contact',
      secondaryCtaText: 'Explore Services',
      secondaryCtaUrl: '#services',
      heroImage: '/images/banners/hero-agency.jpg',
      heroImageAlt: 'Webluxe digital marketing and AI engineering workspace',
      trustItems: [
        'SEO, Ads, SMM, Websites & AI',
        '100% Transparent Scope & Pricing',
        'Response Automation Under 60 Seconds'
      ],
      stats: [
        { id: 'st-1', value: '05+', numericTarget: 5, padLength: 2, suffix: '+', label: 'Digital Services' },
        { id: 'st-2', value: '100%', numericTarget: 100, suffix: '%', label: 'Project Commitment' },
        { id: 'st-3', value: '24/7', numericTarget: 24, suffix: '/7', label: 'Online Support*' },
        { id: 'st-4', value: '01', numericTarget: 1, padLength: 2, label: 'Growth-Focused Mission' }
      ]
    },
    highlights: [
      {
        id: 'hl-1',
        icon: 'target',
        title: 'AI-Powered Marketing',
        description: 'Predictive audience modeling, server-side attribution, and high-velocity creative testing calibrated directly to closed-won revenue.'
      },
      {
        id: 'hl-2',
        icon: 'cpu',
        title: 'Smart Business Automation',
        description: 'Custom AI chatbots, WhatsApp flows, voice agents, and CRM pipelines that qualify leads and book meetings automatically.'
      },
      {
        id: 'hl-3',
        icon: 'trending',
        title: 'Data-Driven Growth',
        description: 'Unified analytics linking Google Ads, Meta, organic search, and CRM lifecycle stages into one clear executive view.'
      },
      {
        id: 'hl-4',
        icon: 'shield',
        title: 'Result-Oriented Strategies',
        description: 'Every sprint is anchored to measurable KPIs—lower acquisition costs, faster speed-to-lead, and higher conversion rates.'
      }
    ],
    about: {
      kicker: 'About WEBLUXE',
      headline: 'Digital Marketing & AI Automation Agency for Business Growth',
      intro: 'WEBLUXE helps ambitious businesses grow through strategic digital marketing, search engine optimization, performance advertising, and AI-powered automation.',
      experience: 'While traditional marketing focuses on clicks and impressions, we focus on building meaningful digital growth strategies. By combining creative thinking, data-driven marketing, and intelligent automation, we help businesses attract customers, generate qualified leads, and build a stronger online presence.',
      closing: 'Whether you\'re a startup, small business, or growing brand, WEBLUXE provides the digital solutions you need to compete and grow in today\'s digital landscape.',
      mission: 'Our mission is to empower businesses with affordable, effective, and innovative digital marketing solutions that improve online visibility, generate quality leads, and support sustainable business growth.',
      vision: 'Our vision is to become a trusted digital growth partner for businesses worldwide by combining creativity, technology, marketing strategy, and AI automation to simplify business growth.',
      whyChooseUs: [
        'Direct senior strategist & AI engineer access on every account',
        '100% client ownership of all ad accounts, workflows, and codebases',
        'Clear scope and startup-friendly transparent pricing',
        'Zero hidden ad-spend markups with dedicated support'
      ],
      image: '/images/team/agency-team.jpg',
      imageAlt: 'WEBLUXE digital marketing and AI automation team collaborating',
      metrics: [
        { value: '05+', label: 'Digital Services', sublabel: 'SEO, Ads, SMM, Websites & AI' },
        { value: '100%', label: 'Transparent Pricing', sublabel: 'Clear scope and pricing' },
        { value: '360°', label: 'Digital Solutions', sublabel: 'Complete digital growth support' },
        { value: '01', label: 'Growth Partner', sublabel: 'One dedicated agency' }
      ]
    },
    services: SERVICES_LIST,
    promoBanner: {
      headline: 'Request a Free 30-Minute Growth & AI Automation Audit',
      description: 'We will map your top 3 conversion leaks, benchmark your ad and SEO acquisition cost, and blueprint an automated lead pipeline tailored to your team.',
      ctaText: 'Claim Your Free Audit',
      ctaUrl: '/contact.html',
      whatsappText: 'Chat on WhatsApp',
      image: '/images/banners/promo-banner.jpg',
      imageAlt: 'Webluxe brand gradient consultation banner backdrop'
    },
    portfolio: PORTFOLIO_LIST,
    pricing: [
      {
        id: 'prc-1',
        tierLabel: 'STARTER',
        name: 'Launch Plan',
        audience: 'For startups and small businesses',
        monthlyPrice: 9999,
        oneTimePrice: 24999,
        customPricing: false,
        recommended: false,
        ctaText: 'Start With Launch',
        includedServices: 'Technical SEO + Google Business Profile + 1 Ad Platform + Landing Page + Lead Integration',
        features: [
          'Technical SEO basics',
          'Google Business Profile optimization',
          'One ad platform management',
          'One landing page',
          'Lead form integration',
          'Monthly performance report'
        ]
      },
      {
        id: 'prc-2',
        tierLabel: 'MOST POPULAR',
        name: 'Growth Plan',
        audience: 'For growing businesses',
        monthlyPrice: 19999,
        oneTimePrice: 49999,
        customPricing: false,
        recommended: true,
        badgeText: 'MOST POPULAR',
        ctaText: 'Choose Growth',
        includedServices: 'Complete SEO + Google & Meta Ads + Social Media + AI Chatbot + WhatsApp & CRM Automation',
        features: [
          'Complete SEO optimization',
          'Google Ads + Meta Ads management',
          'Social media management',
          'AI chatbot integration',
          'WhatsApp lead automation',
          'CRM lead management',
          'Monthly strategy and reporting'
        ]
      },
      {
        id: 'prc-3',
        tierLabel: 'CUSTOM SOLUTIONS',
        name: 'Scale Plan',
        audience: 'For established and ambitious brands',
        monthlyPrice: 0,
        oneTimePrice: 0,
        customPricing: true,
        customPriceLabel: 'Custom Pricing',
        recommended: false,
        ctaText: 'Request Custom Quote',
        includedServices: 'Advanced SEO + Multi-Channel Ads + Custom Website + AI Voice Agents & Custom CRM Workflows',
        features: [
          'Advanced SEO strategy',
          'Multi-channel advertising',
          'Custom website development',
          'Advanced AI automation',
          'AI voice agent integration',
          'Custom CRM workflows',
          'Dedicated project management'
        ]
      }
    ],
    workProcess: [
      {
        id: 'wp-1',
        step: '01',
        title: 'Discovery & Strategy',
        description: 'We audit your current funnel metrics, unit economics, CRM data, and manual bottlenecks to pinpoint highest-ROI opportunities.'
      },
      {
        id: 'wp-2',
        step: '02',
        title: 'Planning & Setup',
        description: 'We architect server-side tracking, landing pages, ad account structures, and AI workflow blueprints before a dollar is spent.'
      },
      {
        id: 'wp-3',
        step: '03',
        title: 'Execution & Automation',
        description: 'Campaigns go live alongside AI chatbots, CRM routing, and multi-channel follow-up sequences tested end-to-end.'
      },
      {
        id: 'wp-4',
        step: '04',
        title: 'Optimization & Growth',
        description: 'Weekly creative, bid, SEO, and prompt refinements compound conversion rates and drive down customer acquisition cost.'
      }
    ],
    testimonials: [
      {
        id: 'tst-1',
        name: 'Ananya Verma',
        displayName: 'Ananya Verma',
        role: 'VP of Growth',
        company: 'ZestPay Technologies, Bengaluru',
        photo: '/images/team/client-avatar.jpg',
        rating: 5,
        quote: 'Before Webluxe, our sales team took 18 hours to reply to inbound demos. Their AI qualification and HubSpot routing cut response time to 38 seconds and lifted qualified demos by 140% in one quarter.'
      },
      {
        id: 'tst-2',
        name: 'Priya Deshmukh',
        displayName: 'Priya Deshmukh',
        role: 'Founder',
        company: 'Vanaura Organics, Mumbai',
        photo: '/images/team/client-avatar.jpg',
        rating: 5,
        quote: 'Restoring server-side Meta attribution and rebuilding our lifecycle email and WhatsApp flows took us from stagnant ROAS to +168% net revenue in six months.'
      },
      {
        id: 'tst-3',
        name: 'Dr. Vikram Malhotra',
        displayName: 'Dr. Vikram Malhotra',
        role: 'Managing Director',
        company: 'PranaCare Clinics, New Delhi',
        photo: '/images/team/client-avatar.jpg',
        rating: 5,
        quote: 'Missed patient calls were costing us bookings every morning. Their AI voice reception and WhatsApp reminder system lifted our answer rate to 92% and cut no-shows by 41%.'
      },
      {
        id: 'tst-4',
        name: 'Siddharth Nair',
        displayName: 'Siddharth Nair',
        role: 'Head of Operations',
        company: 'BharatForge Logistics, Pune',
        photo: '/images/team/client-avatar.jpg',
        rating: 5,
        quote: 'Automating our distributor specification parsing saved our operations desk 32 hours every single week and eliminated manual transcription errors.'
      }
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'What makes Webluxe different from a traditional marketing agency?',
        answer: 'Traditional agencies stop once a visitor clicks an ad or fills a form. We combine performance marketing with AI automation engineering—building the chatbots, CRM workflows, WhatsApp sequences, and conversion pages that turn clicks into booked revenue.'
      },
      {
        id: 'faq-2',
        question: 'How quickly can you launch our campaigns and AI automations?',
        answer: 'Tracking audits, CRM integrations, and core workflows typically launch within 10 to 14 business days. Custom AI voice agents or full website builds follow a 3-to-5 week milestone roadmap.'
      },
      {
        id: 'faq-3',
        question: 'Do we keep ownership of our ad accounts, website code, and AI workflows?',
        answer: 'Yes, 100%. Every ad account, analytics property, CRM workflow, prompt library, and website repository is built directly inside your company accounts.'
      },
      {
        id: 'faq-4',
        question: 'Which CRMs and automation platforms do you integrate with?',
        answer: 'We routinely build on HubSpot, Salesforce, Pipedrive, GoHighLevel, Zoho, Make, n8n, Zapier, WhatsApp Business API, Shopify, and custom REST/GraphQL webhooks.'
      },
      {
        id: 'faq-5',
        question: 'Can we start with a one-time project before committing to a monthly retainer?',
        answer: 'Yes. All three pricing tiers support a one-time project engagement—such as building a custom AI chatbot, high-converting website, or CRM overhaul—before moving into ongoing growth optimization.'
      },
      {
        id: 'faq-6',
        question: 'How do you ensure AI chatbots and voice agents stay accurate and on-brand?',
        answer: 'We use retrieval-augmented generation anchored strictly to your approved documentation, strict guardrails, deterministic booking rules, and human-escalation triggers whenever complex questions arise.'
      },
      {
        id: 'faq-7',
        question: 'What industries do you specialize in?',
        answer: 'Our strongest track records are in B2B SaaS & FinTech, D2C E-commerce, Private Healthcare Clinics, Professional Advisory, and Industrial Supply Chain.'
      },
      {
        id: 'faq-8',
        question: 'How do you measure and report return on investment?',
        answer: 'Every engagement tracks cost per qualified lead, speed-to-lead, booked meetings, pipeline value, and closed-won ROAS inside a live dashboard connected directly to your CRM.'
      },
      {
        id: 'faq-9',
        question: 'Is ad spend included in the Launch, Growth, or Scale package pricing?',
        answer: 'Package pricing covers strategy, creative production, campaign engineering, and automation infrastructure. Media spend is paid directly from your card to Google or Meta with zero agency markup.'
      },
      {
        id: 'faq-10',
        question: 'How do we get started with a free consultation?',
        answer: 'Complete the consultation form on this page or message us directly via the WhatsApp button. You will receive a calendar link and a pre-call audit checklist within minutes.'
      }
    ],
    blogCategories: ['AI Automation', 'Digital Marketing', 'SEO & Content', 'Conversion Strategy'],
    blogs: [
      {
        id: 'blg-1',
        slug: 'ai-lead-qualification-under-60-seconds',
        title: 'How AI Lead Qualification Cuts Speed-to-Lead Under 60 Seconds',
        category: 'AI Automation',
        author: 'Marcus Chen',
        date: '2026-10-28',
        readTime: '6 min read',
        featuredImage: '/images/blog/ai-workflows.jpg',
        excerpt: 'Why waiting even 15 minutes to follow up with an inbound demo request destroys conversion rates—and how automated enrichment fixes it.',
        content: '<p>Research across B2B sales teams shows that responding to an inbound lead within 60 seconds makes you nearly four times more likely to qualify the opportunity than replying 30 minutes later.</p><h2>Why Manual Routing Fails</h2><p>Most companies still rely on static forms that drop leads into a shared inbox or spreadsheet. By the time a representative researches company size, checks territory rules, and sends a manual email, the buyer has already booked with a faster competitor.</p><h2>The 4-Step Automated Pipeline</h2><ul><li><strong>Instant Firmographic Enrichment:</strong> Upon form submission, webhooks enrich domain, employee count, and tech stack in 1.2 seconds.</li><li><strong>AI Intent Scoring:</strong> A lightweight classification step evaluates message urgency and budget fit against historical closed-won deals.</li><li><strong>Dynamic Calendar Routing:</strong> Qualified prospects immediately see the matching account executive\'s live calendar on the confirmation screen.</li><li><strong>Multi-Channel Follow-Up:</strong> Personalized email and optional WhatsApp confirmation trigger automatically if no slot is booked within 5 minutes.</li></ul><p>When deployed for Meridian Cloud, this exact architecture lifted qualified demo conversions by 140% without adding a single SDR.</p>',
        seoTitle: 'AI Lead Qualification Under 60 Seconds | Webluxe Blog',
        seoDescription: 'Learn how automated enrichment, AI intent scoring, and dynamic CRM routing cut speed-to-lead under 60 seconds.',
        status: 'published'
      },
      {
        id: 'blg-2',
        slug: 'server-side-tracking-meta-google-ads-2026',
        title: 'Why Server-Side Tracking Is Non-Negotiable for Paid Acquisition',
        category: 'Digital Marketing',
        author: 'Elena Rostova',
        date: '2026-10-14',
        readTime: '5 min read',
        featuredImage: '/images/portfolio/ecommerce-ai.jpg',
        excerpt: 'Browser cookies miss up to 35% of conversions. Here is how Conversion APIs and offline CRM imports restore ad algorithm efficiency.',
        content: '<p>Ad platforms optimize toward the signals they can observe. When browser-based pixels lose 25% to 35% of conversion events due to privacy blockers and mobile app transitions, automated bidding algorithms drift toward low-quality clicks.</p><h2>Connecting Offline CRM Revenue</h2><p>By piping verified server-side purchase and SQL stage events back to Meta CAPI and Google Ads Enhanced Conversions, bidding algorithms learn which audiences actually generate margin—not just cheap form fills.</p><ul><li>Match hashed first-party emails and click IDs securely server-side.</li><li>Exclude disqualified leads from lookalike seed audiences automatically.</li><li>Measure true blended MER alongside platform ROAS.</li></ul>',
        seoTitle: 'Server-Side Tracking for Paid Ads | Webluxe Blog',
        seoDescription: 'Restore 95%+ conversion attribution accuracy with Meta Conversion API and Google Ads offline CRM imports.',
        status: 'published'
      },
      {
        id: 'blg-3',
        slug: 'commercial-seo-clusters-over-vanity-traffic',
        title: 'Building Commercial SEO Clusters That Actually Drive Sales Calls',
        category: 'SEO & Content',
        author: 'David Park',
        date: '2026-09-29',
        readTime: '7 min read',
        featuredImage: '/images/portfolio/saas-pipeline.jpg',
        excerpt: 'Ranking for broad glossary keywords rarely fills a sales pipeline. Focus on comparison, integration, and use-case search architecture.',
        content: '<p>Too many marketing teams celebrate 100,000 monthly organic visitors while sales leadership asks why pipeline hasn\'t moved. High-volume top-of-funnel definitions attract students and job seekers, not budget holders.</p><h2>Prioritizing High-Intent Architecture</h2><p>Start with bottom-of-funnel service pages, alternative comparisons, industry-specific solution hubs, and technical implementation guides. Pair every cluster with clear internal linking, structured Schema.org JSON-LD, and conversion-focused CTAs.</p>',
        seoTitle: 'Commercial SEO Clusters That Drive Pipeline | Webluxe',
        seoDescription: 'Shift your SEO roadmap from vanity traffic to high-intent commercial clusters that generate qualified sales calls.',
        status: 'published'
      },
      {
        id: 'blg-4',
        slug: 'whatsapp-ai-concierge-service-businesses',
        title: 'Deploying WhatsApp AI Concierges for Service & Healthcare Brands',
        category: 'Conversion Strategy',
        author: 'Priya Nair',
        date: '2026-09-12',
        readTime: '5 min read',
        featuredImage: '/images/portfolio/healthcare-voice.jpg',
        excerpt: 'Email open rates hover around 25%, while WhatsApp messages average over 90%. See how automated booking flows reduce no-shows.',
        content: '<p>Customers expect instant, conversational answers on the messaging app they already check dozens of times a day. Connecting the official WhatsApp Business API to an AI knowledge assistant allows clinics and service businesses to confirm appointments, answer prep questions, and reschedule slots automatically.</p><h2>Measured Impact</h2><p>Across multi-location service brands, automated WhatsApp triage consistently cuts front-desk phone load by 40% while slashing missed appointments.</p>',
        seoTitle: 'WhatsApp AI Concierge Guide | Webluxe Blog',
        seoDescription: 'How service and healthcare brands use WhatsApp Business API and AI assistants to boost bookings and cut no-shows.',
        status: 'published'
      }
    ],
    socialLinks: [
      { id: 'soc-1', platform: 'LinkedIn', url: 'https://linkedin.com' },
      { id: 'soc-2', platform: 'X (Twitter)', url: 'https://x.com' },
      { id: 'soc-3', platform: 'YouTube', url: 'https://youtube.com' },
      { id: 'soc-4', platform: 'Instagram', url: 'https://instagram.com' }
    ],
    footer: {
      description: 'International Digital Marketing & AI Automation Agency engineering predictable acquisition and autonomous revenue operations.',
      quickLinks: [
        { label: 'Home', url: '/index.html' },
        { label: 'About Us', url: '/about.html' },
        { label: 'Pricing Plans', url: '/pricing.html' },
        { label: 'Blog & Insights', url: '/blog.html' },
        { label: 'Contact', url: '/contact.html' }
      ],
      featuredServiceSlugs: [
        'seo-optimization',
        'google-ads-management',
        'ai-chatbot-development',
        'whatsapp-automation',
        'crm-automation',
        'business-website-development'
      ]
    },
    leads: [
      {
        id: 'lead-101',
        name: 'Hannah Brooks',
        email: 'hannah@luminahealth.io',
        phone: '+1 415 555 0142',
        service: 'AI Voice Agents',
        budget: '$3,500 - $7,500/mo',
        message: 'Looking to automate inbound patient scheduling across 4 dental clinics.',
        date: '2026-11-12',
        status: 'Qualified'
      },
      {
        id: 'lead-102',
        name: 'Ryan Kowalski',
        email: 'ryan@vectorfreight.com',
        phone: '+1 312 555 0198',
        service: 'SEO Optimization',
        budget: '$1,800 - $3,500/mo',
        message: 'Need technical SEO overhaul and commercial landing pages for B2B logistics.',
        date: '2026-11-14',
        status: 'New'
      }
    ],
    subscribers: [
      { id: 'sub-1', email: 'cmo@nordicretail.com', date: '2026-11-08' },
      { id: 'sub-2', email: 'ops@atlasmanufacturing.co', date: '2026-11-11' }
    ],
    mediaLibrary: [
      { id: 'img-1', url: '/images/banners/hero-agency.jpg', alt: 'Modern digital strategy and AI studio workspace', category: 'banners' },
      { id: 'img-2', url: '/images/banners/promo-banner.jpg', alt: 'Dark architectural cobalt glass banner backdrop', category: 'banners' },
      { id: 'img-3', url: '/images/team/agency-team.jpg', alt: 'Senior growth and AI engineering team meeting', category: 'team' },
      { id: 'img-4', url: '/images/team/client-avatar.jpg', alt: 'Executive client portrait', category: 'team' },
      { id: 'img-5', url: '/images/portfolio/ecommerce-ai.jpg', alt: 'D2C skincare ecommerce showcase', category: 'portfolio' },
      { id: 'img-6', url: '/images/portfolio/saas-pipeline.jpg', alt: 'B2B FinTech SaaS workspace', category: 'portfolio' },
      { id: 'img-7', url: '/images/portfolio/healthcare-voice.jpg', alt: 'Modern healthcare clinic reception', category: 'portfolio' },
      { id: 'img-8', url: '/images/blog/ai-workflows.jpg', alt: 'Minimalist laptop and notebook desk setup', category: 'blog' }
    ]
  };

  global.VELTRIX_DEFAULT_DATA = DEFAULT_DATA;
})(window);
