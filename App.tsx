
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Icon from './components/Icon';
import { GoogleGenAI } from "@google/genai";

// --- TRANSLATIONS ---
const translations = {
  en: {
    appName: "Sandhiya Construction",
    // Form Page
    formTitle: "Request a Construction Service",
    formDesc: "Please fill out the details below so our team can contact you quickly with the right solution.",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    location: "Your Area / Location",
    locationPlaceholder: "Please type your complete address or nearby landmark.",
    workType: "Type of Work Needed",
    workTypeHelpText: "Select the type of work you need:",
    workTypes: [
      "Mason Work", "Full Building Construction", "Tiles & Flooring", "POP / Painting",
      "Interior / Exterior Work", "Renovation", "Boundary Wall / Gate", "Plumbing & Electrical",
      "Any Custom Construction Request"
    ],
    workDescription: "Work Description (Optional)",
    workDescriptionPlaceholder: "Briefly describe your requirement so we can understand your project better.",
    mobileNumber: "Your Mobile Number",
    mobileNumberPlaceholder: "Enter your 10-digit mobile number for quick contact.",
    email: "Your Email (Optional)",
    emailPlaceholder: "If you want a detailed quotation, please enter your email:",
    submitRequest: "Submit Request",
    formSubmitted: "Your request has been submitted successfully!",
    formSubmittedDesc: "Our team will contact you shortly to discuss your project and provide the best construction solution.",
    // Home Page
    homeTitle: "Welcome to Sandhiya Construction",
    homeDesc: "We provide all types of mason work, building construction, tiles, POP, painting and full civil solutions with professional quality and on-time delivery.",
    callNow: "Call Now",
    whatsappMsg: "WhatsApp Message",
    masonWork: "Mason Work",
    buildingDesigns: "Building Designs",
    submitWork: "Submit Work Request",
    emergencyCall: "Emergency Call",
    aiAssistant: "AI Assistant",
    // Services Page
    servicesTitle: "Our Services",
    servicesList: [
      "Mason Work (Brickwork, Plastering, Wall finishing)", "Full Building Construction", "Tiles & Flooring Work",
      "Painting / POP / Putty", "Interior Work", "Exterior Construction", "Renovation Work", "Building Texture & Design Samples"
    ],
    // Designs Page
    designsTitle: "Our Work & Designs",
    designCategories: [
      "Modern Architecture", "Column & Concrete Textures", "Artistic Brickwork", "Interior Finishing", "Tile & Flooring Patterns", "Foundation & Structures"
    ],
    allCategories: "All",
    viewFullscreen: "View Fullscreen",
    saveImage: "Save Image",
    shareImage: "Share Image",
    close: "Close",
    // Contact Page
    contactTitle: "Contact Us",
    address: "Address",
    addressDetails: "#1, 7th Street,\nRanganathapuram, West Tambaram,\nChennai – 600 045.",
    phoneNumbers: "Phone Numbers",
    whatsappSupport: "WhatsApp Support",
    facebookPage: "Facebook Page",
    emailAddress: "E-mail Address",
    ourLocation: "Our Location",
    // About Page
    aboutTitle: "About Us",
    aboutText: "Sandhiya Construction is a trusted provider of high-quality mason work, building construction and renovation services in Chennai. We deliver durable, safe and aesthetic construction with expert craftsmanship and on-time project completion.",
    // Menu
    menuHome: "Home",
    menuServices: "Services",
    menuDesigns: "Building Designs",
    menuAbout: "About Us",
    menuContact: "Contact Us",
    menuAIAssistant: "AI Assistant",
    menuLanguage: "Language",
    menuShare: "Share App",
    menuTerms: "Terms & Conditions",
    menuPrivacy: "Privacy Policy",
    createdBy: "Application Created By: SANIUR",
    // General
    loading: "Loading...",
    whatsappQuickMessage: "Hello sir, I need construction or mason work in my area. Please contact me.\n\nவணக்கம் ஐயா, என் பகுதியில் கட்டிட/மேஸன் வேலை தேவை. உடனே தொடர்பு கொள்ளவும்.",
    whatsappContactMessage: "Hello sir, I need construction work. Please contact me.\n\nவணக்கம் ஐயா, எனக்கு கட்டிட வேலை தேவை. தயவு செய்து தொடர்பு கொள்ளவும்.",
    // AI Features
    aiAssistantTitle: "AI Construction Assistant",
    aiAssistantDesc: "Have questions about construction, materials, or design ideas? I'm here to help with up-to-date information from Google.",
    typeYourQuestion: "Type your question here...",
    gettingLocation: "Getting your location for better results...",
    locationError: "Could not get your location. Please grant permission and refresh.",
    sources: "Sources:",
    animateWithVeo: "Animate with AI",
    veoTitle: "Animate Your Designs with AI",
    veoDesc: "Bring your ideas to life! Upload an image of your project (like a floor plan or an existing building) and describe the animation you want to see.",
    uploadImage: "Upload Image",
    removeImage: "Remove Image",
    imagePrompt: "Animation Prompt (e.g., 'a modern walkthrough of this house')",
    aspectRatio: "Aspect Ratio",
    landscape: "16:9 Landscape",
    portrait: "9:16 Portrait",
    generateVideo: "Generate Video",
    selectApiKey: "Select API Key to Use Veo",
    selectApiKeyDesc: "Video generation is a powerful feature. Please select your API key to proceed. For more information on billing, visit ai.google.dev/gemini-api/docs/billing.",
    generatingVideo: "Generating video...",
    generatingVideoDesc: "This can take a few minutes. Please keep this page open.",
    videoReady: "Your video is ready!",
    downloadVideo: "Download Video",
    veoError: "An error occurred. Please try again.",
    keyError: "Your API key seems invalid. Please re-select your key.",
    quotaError: "API quota exceeded. Please check your plan and billing details, or try again later.",
  },
  ta: {
    appName: "சந்தியா கன்ஸ்ட்ரக்ஷன்",
    // Form Page
    formTitle: "கட்டுமான சேவையை கோருங்கள்",
    formDesc: "கீழே உள்ள விவரங்களை நிரப்பவும், எங்கள் குழு சரியான தீர்வுடன் உங்களை விரைவாகத் தொடர்புகொள்ளும்.",
    fullName: "முழு பெயர்",
    fullNamePlaceholder: "உங்கள் முழுப் பெயரை உள்ளிடவும்",
    location: "உங்கள் பகுதி / இடம்",
    locationPlaceholder: "உங்கள் முழுமையான முகவரி அல்லது அருகிலுள்ள அடையாளத்தை தட்டச்சு செய்யவும்.",
    workType: "தேவையான வேலையின் வகை",
    workTypeHelpText: "உங்களுக்குத் தேவையான வேலை வகையைத் தேர்ந்தெடுக்கவும்:",
    workTypes: [
      "மேசன் வேலை", "முழு கட்டிட கட்டுமானம்", "டைல்ஸ் & தரை வேலை", "POP / பெயிண்டிங்",
      "உட்புற / வெளிப்புற வேலை", "புதுப்பித்தல்", "சுவர் / கேட்", "குழாய் மற்றும் மின் வேலை",
      "வேறு ஏதேனும் கட்டுமான கோரிக்கை"
    ],
    workDescription: "வேலை விளக்கம் (விருப்பத்தேர்வு)",
    workDescriptionPlaceholder: "உங்கள் தேவையை சுருக்கமாக விவரிக்கவும், உங்கள் திட்டத்தை நாங்கள் நன்கு புரிந்துகொள்ள முடியும்.",
    mobileNumber: "உங்கள் மொபைல் எண்",
    mobileNumberPlaceholder: "விரைவான தொடர்புக்கு உங்கள் 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.",
    email: "உங்கள் மின்னஞ்சல் (விருப்பத்தேர்வு)",
    emailPlaceholder: "விரிவான விலைப்பட்டியல் வேண்டுமானால், உங்கள் மின்னஞ்சலை உள்ளிடவும்.",
    submitRequest: "கோரிக்கையை சமர்ப்பிக்கவும்",
    formSubmitted: "உங்கள் கோரிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!",
    formSubmittedDesc: "உங்கள் திட்டத்தைப் பற்றி விவாதிக்கவும், சிறந்த கட்டுமான தீர்வை வழங்கவும் எங்கள் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்.",
    // Home Page
    homeTitle: "சந்தியா கன்ஸ்ட்ரக்ஷனுக்கு வரவேற்கிறோம்",
    homeDesc: "நாங்கள் அனைத்து வகையான மேசன் வேலை, கட்டிட கட்டுமானம், டைல்ஸ், POP, பெயிண்டிங் மற்றும் முழு சிவில் தீர்வுகளை தொழில்முறை தரம் மற்றும் சரியான நேரத்தில் வழங்குகிறோம்.",
    callNow: "இப்போதே அழைக்கவும்",
    whatsappMsg: "வாட்ஸ்அப் செய்தி",
    masonWork: "மேசன் வேலை",
    buildingDesigns: "கட்டிட வடிவமைப்புகள்",
    submitWork: "வேலை கோரிக்கையை சமர்ப்பிக்கவும்",
    emergencyCall: "அவசர அழைப்பு",
    aiAssistant: "AI உதவியாளர்",
    // Services Page
    servicesTitle: "எங்கள் சேவைகள்",
    servicesList: [
        "மேசன் வேலை (செங்கல் வேலை, பூச்சு, சுவர் வேலை)", "முழு கட்டிட கட்டுமானம்", "டைல்ஸ் & தரை வேலை",
        "பெயிண்டிங் / POP / புட்டி", "உட்புற வேலை", "வெளிப்புற கட்டுமானம்", "புதுப்பித்தல் வேலை", "கட்டிட டெக்ஸ்ச்சர் & வடிவமைப்பு மாதிரிகள்"
    ],
    // Designs Page
    designsTitle: "எங்கள் வேலை & வடிவமைப்புகள்",
    designCategories: [
      "நவீன கட்டிடக்கலை", "தூண் & கான்கிரீட் டெக்ஸ்ச்சர்கள்", "கலைநயம் மிக்க செங்கல் வேலை", "உட்புற ஃபினிஷிங்", "டைல் & தரை வடிவங்கள்", "அடித்தளம் & கட்டமைப்புகள்"
    ],
    allCategories: "அனைத்தும்",
    viewFullscreen: "முழு திரையில் காண்க",
    saveImage: "படத்தை சேமி",
    shareImage: "படத்தை பகிர்",
    close: "மூடு",
    // Contact Page
    contactTitle: "எங்களை தொடர்பு கொள்ள",
    address: "முகவரி",
    addressDetails: "#1, 7வது தெரு,\nரங்கநாதபுரம், மேற்கு தாம்பரம்,\nசென்னை – 600 045.",
    phoneNumbers: "தொலைபேசி எண்கள்",
    whatsappSupport: "வாட்ஸ்அப் ஆதரவு",
    facebookPage: "முகநூல் பக்கம்",
    emailAddress: "மின்னஞ்சல் முகவரி",
    ourLocation: "எங்கள் இருப்பிடம்",
    // About Page
    aboutTitle: "எங்களை பற்றி",
    aboutText: "சந்தியா கன்ஸ்ட்ரக்ஷன் சென்னையில் உயர்தரமான மேசன் வேலை, கட்டிட கட்டுமானம் மற்றும் புதுப்பித்தல் சேவைகளை வழங்கும் ஒரு நம்பகமான நிறுவனம். நாங்கள் நிபுணத்துவம் மற்றும் சரியான நேரத்தில் திட்டத்தை முடித்து, நீடித்த, பாதுகாப்பான மற்றும் அழகியல் கட்டுமானத்தை வழங்குகிறோம்.",
    // Menu
    menuHome: "முகப்பு",
    menuServices: "சேவைகள்",
    menuDesigns: "வடிவமைப்புகள்",
    menuAbout: "எங்களைப் பற்றி",
    menuContact: "தொடர்பு",
    menuAIAssistant: "AI உதவியாளர்",
    menuLanguage: "மொழி",
    menuShare: "பயன்பாட்டைப் பகிரவும்",
    menuTerms: "விதிமுறைகள்",
    menuPrivacy: "தனியுரிமைக் கொள்கை",
    createdBy: "விண்ணப்பத்தை உருவாக்கியவர்: சனியுர்",
    // General
    loading: " ஏற்றுகிறது...",
    whatsappQuickMessage: "வணக்கம் ஐயா, என் பகுதியில் கட்டிட/மேஸன் வேலை தேவை. உடனே தொடர்பு கொள்ளவும்.\n\nHello sir, I need construction or mason work in my area. Please contact me.",
    whatsappContactMessage: "வணக்கம் ஐயா, எனக்கு கட்டிட வேலை தேவை. தயவு செய்து தொடர்பு கொள்ளவும்.\n\nHello sir, I need construction work. Please contact me.",
    // AI Features
    aiAssistantTitle: "AI கட்டுமான உதவியாளர்",
    aiAssistantDesc: "கட்டுமானம், பொருட்கள் அல்லது வடிவமைப்பு யோசனைகள் பற்றி கேள்விகள் உள்ளதா? கூகிளிலிருந்து புதுப்பித்த தகவலுடன் உதவ நான் இங்கே இருக்கிறேன்.",
    typeYourQuestion: "உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யவும்...",
    gettingLocation: "சிறந்த பதில்களுக்காக உங்கள் இருப்பிடத்தைப் பெறுகிறோம்...",
    locationError: "உங்கள் இருப்பிடத்தைப் பெற முடியவில்லை. அனுமதியை வழங்கி புதுப்பிக்கவும்.",
    sources: "ஆதாரங்கள்:",
    animateWithVeo: "AI மூலம் அனிமேட் செய்",
    veoTitle: "உங்கள் வடிவமைப்புகளை AI மூலம் அனிமேட் செய்யுங்கள்",
    veoDesc: "உங்கள் யோசனைகளுக்கு உயிர் கொடுங்கள்! உங்கள் திட்டத்தின் படத்தை (தரைத் திட்டம் அல்லது இருக்கும் கட்டிடம் போன்றவை) பதிவேற்றி, நீங்கள் பார்க்க விரும்பும் அனிஷேனை விவரிக்கவும்.",
    uploadImage: "படத்தை பதிவேற்று",
    removeImage: "படத்தை அகற்று",
    imagePrompt: "அனிமேஷன் ப்ராம்ப்ட் (எ.கா., 'இந்த வீட்டின் நவீன நடைப்பயிற்சி')",
    aspectRatio: "விகித விகிதம்",
    landscape: "16:9 லேண்ட்ஸ்கேப்",
    portrait: "9:16 போர்ட்ரெய்ட்",
    generateVideo: "வீடியோவை உருவாக்கு",
    selectApiKey: "Veo பயன்படுத்த API விசையைத் தேர்ந்தெடுக்கவும்",
    selectApiKeyDesc: "வீடியோ உருவாக்கம் ஒரு சக்திவாய்ந்த அம்சம். தொடர உங்கள் API விசையைத் தேர்ந்தெடுக்கவும். பில்லிங் பற்றிய கூடுதல் தகவலுக்கு, ai.google.dev/gemini-api/docs/billing ஐப் பார்வையிடவும்.",
    generatingVideo: "வீடியோ உருவாக்கப்படுகிறது...",
    generatingVideoDesc: "இதற்கு சில நிமிடங்கள் ஆகலாம். இந்த பக்கத்தை திறந்து வைக்கவும்.",
    videoReady: "உங்கள் வீடியோ தயாராக உள்ளது!",
    downloadVideo: "வீடியோ பதிவிறக்கம்",
    veoError: "ஒரு பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
    keyError: "உங்கள் API விசை தவறானது போல் தெரிகிறது. உங்கள் விசையை மீண்டும் தேர்ந்தெடுக்கவும்.",
    quotaError: "API ஒதுக்கீடு மீறப்பட்டது. உங்கள் திட்டம் மற்றும் பில்லிங் விவரங்களைச் சரிபார்க்கவும் அல்லது பின்னர் மீண்டும் முயற்சிக்கவும்.",
  }
};


// --- HOOKS ---
const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// --- BASE COMPONENTS ---
const PageContainer = ({ children }: { children?: React.ReactNode }) => (
  <div className="p-4 md:p-6">{children}</div>
);

const ContentCard = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
  <div className={`hud-card max-w-4xl mx-auto text-gray-200 ${className}`}>
    {children}
  </div>
);


// --- FORM COMPONENTS ---
const RequestForm = ({ t, onFormSubmit }: { t: any, onFormSubmit: () => void }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    area: '', 
    work: t.workTypes[0], 
    number: '', 
    description: '', 
    email: '' 
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const workTypeExplanations = {
    "Mason Work": "Includes brickwork, plastering, wall finishing, and general repairs.",
    "Full Building Construction": "Complete construction of a new house, commercial building, or structure from foundation to finish.",
    "Tiles & Flooring": "Installation of all types of tiles, marble, granite, and other flooring materials.",
    "POP / Painting": "Includes Plaster of Paris (POP) ceiling work, wall putty, interior and exterior painting.",
    "Interior / Exterior Work": "Covers all interior decoration and exterior facade work.",
    "Renovation": "Upgrading, remodeling, or altering an existing structure.",
    "Boundary Wall / Gate": "Construction of compound walls and installation of gates.",
    "Plumbing & Electrical": "All plumbing pipeline work and electrical wiring/fitting.",
    "Any Custom Construction Request": "For any other specific civil work not listed above."
  };

  const workTypeExplanationsTa = {
    "மேசன் வேலை": "செங்கல் வேலை, பூச்சு, சுவர் முடித்தல் மற்றும் பொதுவான பழுதுகள் அடங்கும்.",
    "முழு கட்டிட கட்டுமானம்": "புதிய வீடு, வணிக கட்டிடம் அல்லது கட்டமைப்பை அடித்தளத்திலிருந்து முழுமையாகக் கட்டுதல்.",
    "டைல்ஸ் & தரை வேலை": "அனைத்து வகையான டைல்ஸ், மார்பிள், கிரானைட் மற்றும் பிற தரை பொருட்கள் பொருத்துதல்.",
    "POP / பெயிண்டிங்": "பிளாஸ்டர் ஆஃப் பாரிஸ் (POP) மேற்கூரை வேலை, சுவர் புட்டி, உட்புற மற்றும் வெளிப்புற பெயிண்டிங் ஆகியவை அடங்கும்.",
    "உட்புற / வெளிப்புற வேலை": "அனைத்து உட்புற அலங்காரம் மற்றும் வெளிப்புற முகப்பு வேலைகளை உள்ளடக்கியது.",
    "புதுப்பித்தல்": "ஏற்கனவே உள்ள ஒரு கட்டமைப்பை மேம்படுத்துதல், மறுவடிவமைத்தல் அல்லது மாற்றுதல்.",
    "சுவர் / கேட்": "சுற்றுச்சுவர் கட்டுதல் மற்றும் வாயில்கள் பொருத்துதல்.",
    "குழாய் மற்றும் மின் வேலை": "அனைத்து பிளம்பிங் குழாய் வேலைகள் மற்றும் மின்சார வயரிங்/பொருத்துதல்.",
    "வேறு ஏதேனும் கட்டுமான கோரிக்கை": "மேலே பட்டியலிடப்படாத வேறு எந்த குறிப்பிட்ட சிவில் வேலைக்கும்."
  };
  
  const currentExplanations = t.appName === "Sandhiya Construction" ? workTypeExplanations : workTypeExplanationsTa;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.area && formData.number) {
        const managerNumbers = ["9840475210", "9841975210"];
        const timestamp = new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'medium' });

        let messageContent = `New Customer Request (${timestamp}):\nName: ${formData.name}\nArea: ${formData.area}\nWork: ${formData.work}\nContact: ${formData.number}`;
        if (formData.description) messageContent += `\nDescription: ${formData.description}`;
        if (formData.email) messageContent += `\nEmail: ${formData.email}`;

        messageContent += `\n\nபுதிய வாடிக்கையாளர் தகவல் (${timestamp}):\nபெயர்: ${formData.name}\nபகுதி: ${formData.area}\nவேலை: ${formData.work}\nஎண்: ${formData.number}`;
        if (formData.description) messageContent += `\nவிளக்கம்: ${formData.description}`;
        if (formData.email) messageContent += `\nமின்னஞ்சல்: ${formData.email}`;
        
        const encodedMessage = encodeURIComponent(messageContent);
        managerNumbers.forEach(num => {
            window.open(`https://wa.me/91${num}?text=${encodedMessage}`, '_blank');
        });

        const smsMessage = `New Construction Request: ${formData.name}, ${formData.area}, ${formData.work}, ${formData.number}`;
        const encodedSms = encodeURIComponent(smsMessage);
        
        setIsSubmitted(true);
        setTimeout(() => {
          onFormSubmit();
        }, 4000); 
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-8 fade-in">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">{t.formSubmitted}</h2>
        <p className="text-lg">{t.formSubmittedDesc}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">{t.fullName}</label>
        <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} placeholder={t.fullNamePlaceholder} className="form-input" />
      </div>
      <div>
        <label htmlFor="area" className="block text-sm font-medium text-gray-300 mb-1">{t.location}</label>
        <input type="text" name="area" id="area" required value={formData.area} onChange={handleChange} placeholder={t.locationPlaceholder} className="form-input" />
      </div>
      <div className="relative">
        <label htmlFor="work" className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
          {t.workType}
          <button type="button" onClick={() => setIsTooltipVisible(!isTooltipVisible)} className="ml-2 text-yellow-400 hover:text-yellow-300">
            <Icon name="about" className="w-5 h-5" />
          </button>
        </label>
        <select name="work" id="work" required value={formData.work} onChange={handleChange} className="form-input appearance-none">
          {t.workTypes.map((type: string) => <option key={type}>{type}</option>)}
        </select>
         {isTooltipVisible && (
          <div className="absolute z-10 mt-2 w-full p-4 bg-slate-800 border border-yellow-500/50 rounded-lg shadow-lg fade-in">
            <h4 className="font-bold mb-2 text-yellow-400">{t.workTypeHelpText}</h4>
            <ul className="space-y-2 text-sm">
              {Object.entries(currentExplanations).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value as string}</li>
              ))}
            </ul>
            <button type="button" onClick={() => setIsTooltipVisible(false)} className="mt-4 text-yellow-400 font-semibold">{t.close}</button>
          </div>
        )}
      </div>
       <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">{t.workDescription}</label>
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} placeholder={t.workDescriptionPlaceholder} className="form-input" rows={3}></textarea>
      </div>
      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-300 mb-1">{t.mobileNumber}</label>
        <input type="tel" name="number" id="number" required value={formData.number} onChange={handleChange} pattern="[0-9]{10}" placeholder={t.mobileNumberPlaceholder} className="form-input" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">{t.email}</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder={t.emailPlaceholder} className="form-input" />
      </div>
      <button type="submit" className="w-full font-bold py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:from-yellow-500 hover:to-orange-600 transition duration-300 transform hover:scale-105 shadow-lg">
        {t.submitRequest}
      </button>
    </form>
  );
};


// --- PAGE COMPONENTS ---
const HomePage = ({ t, onNavClick }: { t: any, onNavClick: (page: string) => void }) => {
    const buttons = [
        { id: 'call', icon: 'contact', label: t.callNow, action: () => window.location.href = 'tel:9840475210' },
        { id: 'whatsapp', icon: 'whatsapp', label: t.whatsappMsg, action: () => window.open(`https://wa.me/919840475210?text=${encodeURIComponent(t.whatsappQuickMessage)}`, '_blank') },
        { id: 'designs', icon: 'designs', label: t.buildingDesigns, action: () => onNavClick('designs') },
        { id: 'services', icon: 'services', label: t.menuServices, action: () => onNavClick('services') },
        { id: 'request', icon: 'work', label: t.submitWork, action: () => onNavClick('requestForm') },
        { id: 'emergency', icon: 'emergency', label: t.emergencyCall, action: () => window.location.href = 'tel:9841975210' },
    ];

    return (
        <div className="homepage-container">
            <div className="radial-menu-container">
                <div className="app-title-container">
                    <h1 className="text-2xl font-bold text-yellow-400">{t.appName}</h1>
                </div>
                {buttons.map((btn, index) => (
                    <div key={btn.id} className="button-orbit" style={{ '--i': index } as React.CSSProperties}>
                        <button onClick={btn.action} className="radial-button">
                            <Icon name={btn.icon} className="w-8 h-8" />
                        </button>
                        <span className="button-label" style={{ '--i': index } as React.CSSProperties}>{btn.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ServicesPage = ({ t }: { t: any }) => (
  <PageContainer>
    <h2 className="page-title text-3xl font-bold text-yellow-400">{t.servicesTitle}</h2>
    <ContentCard>
      <ul className="space-y-4">
        {t.servicesList.map((service: string, index: number) => (
          <li 
            key={index} 
            className="interactive-list-item stagger-item"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="font-semibold text-white">{service}</span>
          </li>
        ))}
      </ul>
    </ContentCard>
  </PageContainer>
);

const DesignsPage = ({ t }: { t: any }) => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const designs = {
    "Modern Architecture": [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    "Column & Concrete Textures": [
      "https://images.unsplash.com/photo-1598379027848-036329864868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      "https://images.unsplash.com/photo-1517999144091-3d9d7afb5a26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    "Artistic Brickwork": [
      "https://images.unsplash.com/photo-1525113999948-3688c52c614b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1604355345244-a699a7569562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    ],
    "Interior Finishing": [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    ],
    "Tile & Flooring Patterns": [
      "https://images.unsplash.com/photo-1599813133227-cb0623a95383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1587398305373-7729b19e7a96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
     "Foundation & Structures": [
      "https://images.unsplash.com/photo-1541888946425-d81bb1984023?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    ]
  };

  const categories = [t.allCategories, ...t.designCategories];
  const langKeyCategories = ['All', ...Object.keys(designs)];
  
  const handleSaveImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `sandhiya-construction-design-${Date.now()}.${blob.type.split('/')[1]}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download image:", error);
      alert("Failed to save image.");
    }
  };

  const filteredDesigns = activeCategory === 'All' || activeCategory === t.allCategories
    ? Object.values(designs).flat()
    : designs[langKeyCategories[categories.indexOf(activeCategory)] as keyof typeof designs] || [];

  return (
    <PageContainer>
      <h2 className="page-title text-3xl font-bold text-yellow-400">{t.designsTitle}</h2>
      <ContentCard>
        <VeoAnimator t={t} />
        <div className="filter-tabs-container mb-6 pb-2 flex space-x-3">
          {categories.map((category: string, index: number) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`filter-tab ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredDesigns.map((src: string, index: number) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer" onClick={() => setFullscreenImage(src)}>
              <img src={src} alt={`${activeCategory} Design ${index + 1}`} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-bold">{t.viewFullscreen}</span>
              </div>
            </div>
          ))}
        </div>
      </ContentCard>
       {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 fade-in" onClick={() => setFullscreenImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh] bg-slate-900 p-4 rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={fullscreenImage} alt="Fullscreen Design" className="w-full h-full object-contain" />
            <button onClick={() => setFullscreenImage(null)} className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black/80">
              <Icon name="close" className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-4">
                <button onClick={() => handleSaveImage(fullscreenImage)} className="flex items-center space-x-2 bg-yellow-500 text-slate-900 font-bold py-2 px-4 rounded-full hover:bg-yellow-400 transition transform hover:scale-105">
                    <Icon name="download" className="w-5 h-5" />
                    <span>{t.saveImage}</span>
                </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};


const VeoAnimator = ({ t }: { t: any }) => {
  const [hasKey, setHasKey] = useState(false);
  const [image, setImage] = useState<{ file: File, preview: string } | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.aistudio) {
      window.aistudio.hasSelectedApiKey().then(setHasKey);
    }
  }, []);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handleGenerateVideo = async () => {
    if (!image || !prompt) {
      setError('Please upload an image and provide a prompt.');
      return;
    }
    setError('');
    setIsLoading(true);
    setVideoUrl('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = error => reject(error);
      });

      const base64Image = await toBase64(image.file);
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
          imageBytes: base64Image,
          mimeType: image.file.type,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio,
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setVideoUrl(`${downloadLink}&key=${process.env.API_KEY}`);
      } else {
        throw new Error('Video generation failed to return a link.');
      }
    } catch (e: any) {
        console.error(e);
        if (e.message?.includes("Requested entity was not found")) {
            setError(t.keyError);
            setHasKey(false);
        } else if (e.message?.includes("quota")) {
            setError(t.quotaError);
        } else {
            setError(t.veoError);
        }
    } finally {
      setIsLoading(false);
    }
  };


  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-yellow-400">{t.generatingVideo}</p>
          <p className="text-gray-300">{t.generatingVideoDesc}</p>
        </div>
      );
    }

    if (videoUrl) {
      return (
        <div className="text-center p-4">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">{t.videoReady}</h3>
          <video src={videoUrl} controls className="w-full max-w-md mx-auto rounded-lg mb-4"></video>
          <a href={videoUrl} download target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 font-bold py-2 px-5 rounded-full hover:bg-yellow-400 transition">
            <Icon name="download" className="w-5 h-5"/>
            {t.downloadVideo}
          </a>
        </div>
      );
    }

    if (!hasKey) {
        return (
            <div className="text-center p-8 border border-yellow-500/30 rounded-lg">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">{t.selectApiKey}</h3>
                <p className="text-gray-300 mb-4">{t.selectApiKeyDesc}</p>
                <button
                    onClick={async () => {
                        if(window.aistudio) {
                            await window.aistudio.openSelectKey();
                            setHasKey(true);
                        }
                    }}
                    className="bg-yellow-500 text-slate-900 font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition"
                >
                    {t.selectApiKey}
                </button>
            </div>
        )
    }

    return (
      <div className="space-y-4">
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" ref={fileInputRef}/>
          <div 
            onClick={() => fileInputRef.current?.click()} 
            className="cursor-pointer border-2 border-dashed border-gray-500 rounded-lg p-6 text-center hover:border-yellow-400 transition"
          >
            {image ? (
              <div className="relative inline-block">
                <img src={image.preview} alt="Preview" className="max-h-40 rounded-lg mx-auto" />
                <button onClick={(e) => { e.stopPropagation(); setImage(null); }} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1">
                  <Icon name="close" className="w-4 h-4"/>
                </button>
              </div>
            ) : (
              <div>
                <Icon name="upload" className="w-12 h-12 mx-auto text-gray-400 mb-2"/>
                <p className="font-semibold text-yellow-400">{t.uploadImage}</p>
              </div>
            )}
          </div>
        </div>
        
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t.imagePrompt} className="form-input" />
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">{t.aspectRatio}</label>
          <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as '16:9' | '9:16')} className="form-input appearance-none">
            <option value="16:9">{t.landscape}</option>
            <option value="9:16">{t.portrait}</option>
          </select>
        </div>
        
        <button onClick={handleGenerateVideo} className="w-full font-bold py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:from-yellow-500 hover:to-orange-600 transition">
          {t.generateVideo}
        </button>
        {error && <p className="text-red-400 text-center">{error}</p>}
      </div>
    );
  };
  
  return (
    <details className="mb-8 hud-card">
      <summary className="cursor-pointer text-xl font-bold text-yellow-400 flex items-center justify-between">
        <span>{t.veoTitle}</span>
        <Icon name="movie" className="w-6 h-6"/>
      </summary>
      <div className="mt-4">
        <p className="text-gray-300 mb-4">{t.veoDesc}</p>
        {renderContent()}
      </div>
    </details>
  );
};


const AIAssistant = ({ t }: { t: any }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', parts: { text: string }[], grounding?: any[] }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState<{lat: number, lon: number} | null>(null);
  const [locationStatus, setLocationStatus] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocationStatus(t.gettingLocation);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLocationStatus('');
      },
      () => {
        setLocationStatus(t.locationError);
      }
    );
  }, [t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, parts: [{ text: input }] }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,
        config: {
          tools: [{googleSearch: {}}, {googleMaps: {}}],
          ...(location && {
            toolConfig: {
              retrievalConfig: {
                latLng: {
                  latitude: location.lat,
                  longitude: location.lon,
                }
              }
            }
          })
        },
      });

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

      setMessages(prev => [...prev, {
        role: 'model' as const,
        parts: [{ text: response.text }],
        grounding: groundingChunks
      }]);
    } catch (e: any) {
        console.error(e);
         if (e.message?.includes("quota")) {
            setError(t.quotaError);
        } else {
            setError('An error occurred. Please try again.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
        <h2 className="page-title text-3xl font-bold text-yellow-400">{t.aiAssistantTitle}</h2>
        <ContentCard className="flex flex-col h-[calc(100vh-18rem)]">
            <div className="flex-grow overflow-y-auto pr-4 space-y-4">
                <div className="p-4 bg-slate-900/50 rounded-lg">
                    <p className="text-gray-300">{t.aiAssistantDesc}</p>
                    {locationStatus && <p className="text-sm text-yellow-400 mt-2">{locationStatus}</p>}
                </div>

                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xl p-3 rounded-2xl ${msg.role === 'user' ? 'bg-yellow-500 text-slate-900 rounded-br-none' : 'bg-slate-700 text-gray-200 rounded-bl-none'}`}>
                           <div dangerouslySetInnerHTML={{ __html: msg.parts[0].text.replace(/\n/g, '<br />') }} />
                           {msg.grounding && msg.grounding.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-slate-600">
                                    <h4 className="text-xs font-bold mb-1">{t.sources}</h4>
                                    <ul className="text-xs space-y-1">
                                        {msg.grounding.map((chunk: any, i: number) => (
                                          <li key={i}>
                                            <a href={chunk.web?.uri || chunk.maps?.uri} target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">
                                                {i + 1}. {chunk.web?.title || chunk.maps?.title || 'Source'}
                                            </a>
                                          </li>
                                        ))}
                                    </ul>
                                </div>
                           )}
                        </div>
                    </div>
                ))}
                 <div ref={messagesEndRef} />
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                        placeholder={t.typeYourQuestion}
                        className="form-input flex-grow"
                        disabled={isLoading}
                    />
                    <button onClick={sendMessage} disabled={isLoading} className="bg-yellow-500 text-slate-900 p-3 rounded-full disabled:bg-gray-500">
                        {isLoading ? (
                            <div className="w-6 h-6 border-t-2 border-slate-900 rounded-full animate-spin"></div>
                        ) : (
                            <Icon name="chevron-right" className="w-6 h-6" />
                        )}
                    </button>
                </div>
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>
        </ContentCard>
    </PageContainer>
  );
};


const AboutPage = ({ t }: { t: any }) => (
  <PageContainer>
    <h2 className="page-title text-3xl font-bold text-yellow-400">{t.aboutTitle}</h2>
    <ContentCard>
      <p className="text-lg leading-relaxed">{t.aboutText}</p>
    </ContentCard>
  </PageContainer>
);

const ContactPage = ({ t }: { t: any }) => (
  <PageContainer>
    <h2 className="page-title text-3xl font-bold text-yellow-400">{t.contactTitle}</h2>
    <ContentCard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold text-xl text-yellow-400 mb-2">{t.address}</h3>
          <p className="whitespace-pre-line">{t.addressDetails}</p>
        </div>
        <div>
          <h3 className="font-bold text-xl text-yellow-400 mb-2">{t.phoneNumbers}</h3>
          <a href="tel:9840475210" className="block hover:text-yellow-300">98404 75210</a>
          <a href="tel:9841975210" className="block hover:text-yellow-300">98419 75210</a>
        </div>
        <div>
            <h3 className="font-bold text-xl text-yellow-400 mb-2">{t.emailAddress}</h3>
            <a href="mailto:Sandhiyaconstruction06@gmail.com" className="flex items-center gap-2 hover:text-yellow-300">
                <Icon name="email" className="w-5 h-5"/>
                <span>Sandhiyaconstruction06@gmail.com</span>
            </a>
        </div>
        <div>
          <h3 className="font-bold text-xl text-yellow-400 mb-2">{t.whatsappSupport}</h3>
          <a href={`https://wa.me/919840475210?text=${encodeURIComponent(t.whatsappContactMessage)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-300">
            <Icon name="whatsapp" className="w-5 h-5" />
            <span>+91 98404 75210</span>
          </a>
        </div>
        <div className="md:col-span-2">
          <h3 className="font-bold text-xl text-yellow-400 mb-2">{t.facebookPage}</h3>
          <a href="https://www.facebook.com/share/17axXxEEhA/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-300">
            <Icon name="facebook" className="w-5 h-5" />
            <span>Sandhiya Construction</span>
          </a>
        </div>
        <div className="md:col-span-2">
            <h3 className="font-bold text-xl text-yellow-400 mb-2">{t.ourLocation}</h3>
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.971531238997!2d80.11306867586119!3d12.973656987342624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525fb151c86307%3A0x95924719224f8d55!2sSandhiya%20Construction!5e0!3m2!1sen!2sin!4v1720875283503!5m2!1sen!2sin" 
                width="100%" 
                height="300" 
                style={{border:0}} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg"
             ></iframe>
        </div>
      </div>
    </ContentCard>
  </PageContainer>
);


// --- MAIN APP COMPONENT ---
const Clock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);
  return (
    <div className="digital-clock">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
    </div>
  );
};


const Header = ({ onNavClick, onShareClick, t }: { onNavClick: (page: string) => void; onShareClick: () => Promise<void>; t: any }) => (
  <header className="sticky top-0 z-40 bg-slate-900/50 backdrop-filter backdrop-blur-lg border-b border-white/10 shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <button onClick={() => onNavClick('home')} className="flex-shrink-0 flex items-center gap-2 text-white font-bold text-xl">
             <Icon name="building" className="h-8 w-8 text-yellow-400"/>
            <span>{t.appName}</span>
          </button>
        </div>
        <div className="flex items-center">
            <Clock />
            <button onClick={() => onNavClick('language')} className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition">
              <Icon name="language" className="h-6 w-6" />
            </button>
            <button onClick={onShareClick} className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition">
              <Icon name="share" className="h-6 w-6" />
            </button>
        </div>
      </div>
    </div>
  </header>
);

const Footer = ({ t, activePage, onNavClick }: { t: any; activePage: string; onNavClick: (page: string) => void }) => {
  const navItems = [
    { id: 'home', icon: 'home', label: t.menuHome },
    { id: 'services', icon: 'services', label: t.menuServices },
    { id: 'designs', icon: 'designs', label: t.menuDesigns },
    { id: 'contact', icon: 'contact', label: t.menuContact },
    { id: 'aiAssistant', icon: 'sparkles', label: t.menuAIAssistant },
  ];
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 p-4">
        <div className="relative max-w-lg mx-auto h-16 bg-slate-900/60 backdrop-filter backdrop-blur-xl border border-white/10 rounded-full shadow-2xl flex justify-around items-center">
             {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => onNavClick(item.id)}
                    className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-full transition-colors duration-300 z-10 ${activePage === item.id ? 'text-slate-900' : 'text-gray-300 hover:text-white'}`}
                >
                    <Icon name={item.icon} className="w-6 h-6" />
                    <span className="text-xs mt-1">{item.label}</span>
                </button>
            ))}
            <div
              className="absolute h-16 w-16 top-0 rounded-full nav-pill transition-all duration-500 ease-in-out"
              style={{
                left: `${navItems.findIndex(item => item.id === activePage) * 20}%`, // 100% / 5 items = 20% per item
              }}
            />
        </div>
    </footer>
  );
};

const ParticleBackground = () => (
    <div className="particle-container">
        {Array.from({ length: 50 }).map((_, i) => (
            <span
                key={i}
                className="particle"
                style={{
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    animationDelay: `${Math.random() * 20}s`,
                    animationDuration: `${Math.random() * 15 + 10}s`,
                }}
            />
        ))}
    </div>
);


export default function App() {
  const [lang, setLang] = useLocalStorage('lang', 'en');
  const [page, setPage] = useState('home');
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const handleNavClick = (newPage: string) => {
    if (newPage === 'language') {
      setLang((prevLang: string) => (prevLang === 'en' ? 'ta' : 'en'));
    } else {
      setPage(newPage);
    }
  };
  
  const handleShare = async () => {
    const shareData = {
      title: t.appName,
      text: t.homeDesc,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Share feature is not supported in your browser.");
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage t={t} onNavClick={handleNavClick} />;
      case 'services': return <ServicesPage t={t} />;
      case 'designs': return <DesignsPage t={t} />;
      case 'about': return <AboutPage t={t} />;
      case 'contact': return <ContactPage t={t} />;
      case 'aiAssistant': return <AIAssistant t={t} />;
      case 'requestForm': return (
        <PageContainer>
            <h2 className="page-title text-3xl font-bold text-yellow-400">{t.formTitle}</h2>
            <ContentCard>
                <p className="mb-6 text-center">{t.formDesc}</p>
                <RequestForm t={t} onFormSubmit={() => setPage('home')} />
            </ContentCard>
        </PageContainer>
      );
      default: return <HomePage t={t} onNavClick={handleNavClick} />;
    }
  };

  return (
    <div className="futuristic-background min-h-screen text-white">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onNavClick={handleNavClick} onShareClick={handleShare} t={t} />
        <main className="flex-grow pb-24">
           <div key={page} className="page-transition-wrapper">
             {renderPage()}
           </div>
        </main>
        <Footer t={t} activePage={page} onNavClick={handleNavClick} />
      </div>
    </div>
  );
}
