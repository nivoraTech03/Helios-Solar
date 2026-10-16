import { FAQItem } from "@/types/product";

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Which solar panel technology should I choose: Mono-PERC, TOPCon, or Bifacial?",
    category: "solar",
    answer:
      "If you have a flat, light-colored roof or elevated mounting structure, **TOPCon Bifacial panels** are recommended as they generate up to 25–30% additional electricity from the rear side. For standard compact sloped roofs, **Mono-PERC panels** offer fantastic cost-efficiency. TOPCon also has superior heat tolerance (-0.30%/°C), performing better in Indian summer temperatures exceeding 42°C.",
  },
  {
    id: "faq-2",
    question: "Which battery is suitable for my inverter?",
    category: "battery",
    answer:
      "Battery selection depends on your inverter voltage: **Single-battery inverters require 12V** (such as 150Ah or 220Ah tall tubulars), **double-battery inverters require 24V**, and **high-capacity hybrid inverters require 48V**. If upgrading to **LiFePO4 lithium batteries**, ensure your inverter has selectable lithium charging parameters or RS485/CAN communication ports. Feel free to WhatsApp our technical team with a photo of your inverter plate for instant verification.",
  },
  {
    id: "faq-3",
    question: "Do you sell LiFePO4 (Lithium Iron Phosphate) batteries, and how long do they last?",
    category: "battery",
    answer:
      "Yes! We specialize in Grade-A prismatic LiFePO4 batteries. Unlike traditional lead-acid batteries that last 3–4 years, our LiFePO4 systems deliver 6,000+ deep cycles (10 to 15 years design life). They require zero water topping, emit zero toxic gases, support ultra-fast 2-hour charging, and provide 100% usable depth of discharge without damaging cells.",
  },
  {
    id: "faq-4",
    question: "Which EV battery is compatible with my electric vehicle?",
    category: "ev",
    answer:
      "For 2-wheelers (e-scooters), match the nominal system voltage (usually 48V, 60V, or 72V) and physical tray dimensions. For 3-wheelers (e-rickshaws), 48V 100Ah LiFePO4 packs are standard replacements for heavy 4-battery lead-acid sets. All our EV packs are AIS-156 Amendment III certified with automated laser cell connections and IP67 waterproof encasings.",
  },
  {
    id: "faq-5",
    question: "Is installation and DISCOM net-metering assistance available?",
    category: "installation",
    answer:
      "Yes, we provide end-to-end rooftop solar installation services and DISCOM net-metering liaison across major Indian cities and states (including Delhi-NCR, Maharashtra, Gujarat, Rajasthan, Karnataka, UP, and Punjab). For self-installers and contractors, our turnkey solar kits arrive pre-engineered with detailed wiring diagrams and mounting hardware.",
  },
  {
    id: "faq-6",
    question: "What warranty covers your solar panels, inverters, and batteries?",
    category: "warranty",
    answer:
      "All products carry official manufacturer warranties: Solar panels have a **25 to 30-year linear performance warranty** and 10–12 years product warranty. LiFePO4 lithium batteries come with **5 to 10-year warranties**. Inverters carry **2 to 8-year warranties**. Warranty cards with unique serial numbers are supplied with every order and registered in our support database.",
  },
  {
    id: "faq-7",
    question: "How can I request a bulk or B2B dealer quotation?",
    category: "ordering",
    answer:
      "For bulk dealer purchases, project EPC pricing, or installer partnership discounts, click our 'Request a Quote' button or message us directly on WhatsApp with your company name, GSTIN, and bill of materials. Our enterprise sales desk responds within 2 hours with tiered pricing.",
  },
  {
    id: "faq-8",
    question: "What are your shipping and return policies?",
    category: "ordering",
    answer:
      "We provide insured freight transit across all PIN codes in India. Solar panels and heavy battery packs are secured in reinforced wooden pallets. In the rare event of transit damage, you are fully protected: simply photograph the package before signing the delivery challan, and a replacement will be dispatched immediately.",
  },
];
