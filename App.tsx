

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
    veoDesc: "உங்கள் யோசனைகளுக்கு உயிர் கொடுங்கள்! உங்கள் திட்டத்தின் படத்தை (தரைத் திட்டம் அல்லது இருக்கும் கட்டிடம் போன்றவை) பதிவேற்றி, நீங்கள் பார்க்க விரும்பும் அனிமேஷனை விவரிக்கவும்.",
    uploadImage: "படத்தை பதிவேற்று",
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
// FIX: Made the `children` prop optional to resolve TypeScript errors.
const PageContainer = ({ children }: { children?: React.ReactNode }) => (
  <div className="p-4 md:p-6 fade-in-content">{children}</div>
);

// FIX: Made the `children` prop optional to resolve TypeScript errors.
const ContentCard = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
  <div className={`bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-lg p-6 max-w-4xl mx-auto text-gray-200 ${className}`}>
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.area && formData.number) {
      const managerNumbers = ["9840475210", "9841975210"];
      
      let messageContent = `New Customer Request:\nName: ${formData.name}\nArea: ${formData.area}\nWork: ${formData.work}\nContact: ${formData.number}`;
      if (formData.description) messageContent += `\nDescription: ${formData.description}`;
      if (formData.email) messageContent += `\nEmail: ${formData.email}`;

      let tamilMessageContent = `புதிய வாடிக்கையாளர் கோரிக்கை:\nபெயர்: ${formData.name}\nபகுதி: ${formData.area}\nவேலை: ${formData.work}\nஎண்: ${formData.number}`;
      if (formData.description) tamilMessageContent += `\nவிளக்கம்: ${formData.description}`;
      if (formData.email) tamilMessageContent += `\nமின்னஞ்சல்: ${formData.email}`;

      const whatsappMessage = `${messageContent}\n\n---\n\n${tamilMessageContent}`;
      const smsMessage = `New Request: ${formData.name}, ${formData.area}, ${formData.work}, ${formData.number}`;

      // WhatsApp Automation
      const whatsappUrl = `https://wa.me/${managerNumbers[0]}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      // SMS Automation
      setTimeout(() => {
        const smsUrl = `sms:${managerNumbers[1]}?body=${encodeURIComponent(smsMessage)}`;
        window.location.href = smsUrl;
      }, 500);

      setIsSubmitted(true);
      setTimeout(() => {
        onFormSubmit();
      }, 4000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="h-full flex items-center justify-center p-4 fade-in">
        <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 text-white rounded-lg p-8 text-center shadow-2xl max-w-sm mx-auto slide-up">
          <svg className="w-16 h-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold mt-4">{t.formSubmitted}</h2>
          <p className="mt-2 text-gray-300">{t.formSubmittedDesc}</p>
        </div>
      </div>
    );
  }

  return (
     <PageContainer>
      <ContentCard className="max-w-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 text-center mb-2">{t.formTitle}</h2>
        <p className="text-center text-gray-400 mb-6">{t.formDesc}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">{t.fullName}</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t.fullNamePlaceholder} className="form-input" required />
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-300">{t.location}</label>
            <input type="text" id="area" name="area" value={formData.area} onChange={handleChange} placeholder={t.locationPlaceholder} className="form-input" required />
          </div>
          <div>
            <label htmlFor="work" className="block text-sm font-medium text-gray-300">{t.workType}</label>
            <p className="text-xs text-gray-500 mb-1">{t.workTypeHelpText}</p>
            <select id="work" name="work" value={formData.work} onChange={handleChange} className="form-input">
              {t.workTypes.map((type: string) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">{t.workDescription}</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder={t.workDescriptionPlaceholder} rows={3} className="form-input" />
          </div>
          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-300">{t.mobileNumber}</label>
            <input type="tel" id="number" name="number" value={formData.number} onChange={handleChange} placeholder={t.mobileNumberPlaceholder} className="form-input" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t.email}</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder={t.emailPlaceholder} className="form-input" />
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-gray-800">
            {t.submitRequest}
          </button>
        </form>
      </ContentCard>
    </PageContainer>
  );
};

// --- AI FEATURE COMPONENTS ---
const AIAssistant = ({ t }: { t: any }) => {
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState(t.gettingLocation);
  const [sources, setSources] = useState<any[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const ai = useRef<GoogleGenAI | null>(null);

  useEffect(() => {
    ai.current = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationStatus('');
      },
      () => {
        setLocationStatus(t.locationError);
      }
    );
  }, [t.gettingLocation, t.locationError]);

   useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSendMessage = async () => {
    if (!newQuestion.trim() || !ai.current) return;
    setError('');
    setIsLoading(true);
    setSources([]);

    const currentQuestion = newQuestion;
    setChatHistory(prev => [...prev, { role: 'user' as const, parts: [{ text: currentQuestion }] }]);
    setNewQuestion('');

    try {
      const response = await ai.current.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [...chatHistory, { role: 'user' as const, parts: [{ text: currentQuestion }] }],
        config: {
          tools: [{ googleMaps: {}, googleSearch: {} }],
          toolConfig: location ? {
            retrievalConfig: { latLng: location }
          } : undefined,
        },
      });

      const text = response.text;
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

      setChatHistory(prev => [...prev, { role: 'model' as const, parts: [{ text: text || "Sorry, I couldn't process that." }] }]);
      if (groundingMetadata?.groundingChunks) {
        setSources(groundingMetadata.groundingChunks);
      }
    } catch (err: any) {
      console.error(err);
      let errorMessage = "An unexpected error occurred.";
      if (err.message && (err.message.includes('429') || err.message.toUpperCase().includes("RESOURCE_EXHAUSTED"))) {
        errorMessage = t.quotaError;
      }
      setError(errorMessage);
       setChatHistory(prev => { // Rollback user message on error
         const newHistory = [...prev];
         newHistory.pop();
         return newHistory;
       });
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
      line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');       // Italic
      if (line.startsWith('* ')) {
        return <li key={i} className="list-disc ml-5" dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
      }
      return <p key={i} dangerouslySetInnerHTML={{ __html: line }} />;
    });
  };

  return (
    <PageContainer>
      <ContentCard>
        <div className="text-center mb-6">
          <Icon name="sparkles" className="w-12 h-12 mx-auto text-yellow-400" />
          <h1 className="text-2xl font-bold mt-2 text-yellow-400">{t.aiAssistantTitle}</h1>
          <p className="text-gray-400 mt-1">{t.aiAssistantDesc}</p>
        </div>

        <div className="space-y-4 mb-4 h-96 overflow-y-auto p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg p-3 rounded-xl ${msg.role === 'user' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}>
                {renderContent(msg.parts[0].text)}
              </div>
            </div>
          ))}
          {isLoading && <div className="flex justify-start"><div className="bg-gray-700 text-white p-3 rounded-xl">...</div></div>}
           {sources.length > 0 && (
             <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                <h3 className="font-bold text-sm mb-2 text-yellow-400">{t.sources}</h3>
                <ul className="space-y-1">
                  {sources.map((source, i) => (
                    <li key={i} className="truncate">
                      <a href={source.web?.uri || source.maps?.uri} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline">
                        {source.web?.title || source.maps?.title || "Source"}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
           )}
           <div ref={chatEndRef} />
        </div>

        {error && <p className="text-red-500 text-center text-sm mb-2">{error}</p>}
        {locationStatus && <p className="text-blue-400 text-center text-sm mb-2">{locationStatus}</p>}

        <div className="flex space-x-2">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.typeYourQuestion}
            className="form-input flex-grow"
            disabled={isLoading}
          />
          <button onClick={handleSendMessage} disabled={isLoading} className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 disabled:bg-gray-500 transition-colors">
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </ContentCard>
    </PageContainer>
  );
};

const VeoAnimator = ({ t }: { t: any }) => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [apiKeySelected, setApiKeySelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const ai = useRef<GoogleGenAI | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
        setApiKeySelected(true);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setApiKeySelected(true); // Assume success to avoid race condition
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleGenerateVideo = async () => {
    if (!image || !prompt || !apiKeySelected) return;

    setIsLoading(true);
    setVideoUrl(null);
    setError('');
    ai.current = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    try {
      const base64Data = image.split(',')[1];
      let operation = await ai.current.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
          imageBytes: base64Data,
          mimeType: 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio,
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.current.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        throw new Error("Video generation failed to produce a valid link.");
      }
    } catch (err: any) {
        console.error(err);
        let errorMessage = t.veoError;
        if (err.message && err.message.includes("not found")) {
            errorMessage = t.keyError;
            setApiKeySelected(false);
        } else if (err.message && (err.message.includes('429') || err.message.toUpperCase().includes("RESOURCE_EXHAUSTED"))) {
            errorMessage = t.quotaError;
        }
        setError(errorMessage);
    } finally {
        setIsLoading(false);
    }
  };

  const ApiKeySelector = () => (
    <ContentCard className="max-w-2xl text-center">
        <Icon name="movie" className="w-12 h-12 mx-auto text-yellow-400" />
        <h2 className="text-xl font-bold mt-2 text-yellow-400">{t.selectApiKey}</h2>
        <p className="text-gray-400 mt-2 mb-4">{t.selectApiKeyDesc}</p>
        <button onClick={handleSelectKey} className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition-all">
            Select API Key
        </button>
    </ContentCard>
  );

  if (!apiKeySelected) return <ApiKeySelector />;

  return (
    <ContentCard className="max-w-2xl">
      <div className="text-center mb-6">
        <Icon name="movie" className="w-12 h-12 mx-auto text-yellow-400" />
        <h2 className="text-xl font-bold mt-2 text-yellow-400">{t.veoTitle}</h2>
        <p className="text-gray-400 mt-1">{t.veoDesc}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">{t.uploadImage}</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500/10 file:text-yellow-300 hover:file:bg-yellow-500/20" />
        </div>
        {image && <img src={image} alt="Upload preview" className="rounded-lg max-h-48 mx-auto" />}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">{t.imagePrompt}</label>
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="form-input w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">{t.aspectRatio}</label>
          <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="form-input w-full">
            <option value="16:9">{t.landscape}</option>
            <option value="9:16">{t.portrait}</option>
          </select>
        </div>
        <button onClick={handleGenerateVideo} disabled={isLoading || !image || !prompt} className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg shadow-md hover:bg-yellow-600 disabled:bg-gray-500 transition-all">
          {isLoading ? `${t.generatingVideo}...` : t.generateVideo}
        </button>
      </div>

      {isLoading && <p className="text-center mt-4 text-gray-400">{t.generatingVideoDesc}</p>}
      {error && <p className="text-center mt-4 text-red-400">{error}</p>}
      
      {videoUrl && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-bold mb-2 text-green-400">{t.videoReady}</h3>
          <video src={videoUrl} controls className="w-full rounded-lg" />
          <a href={videoUrl} download="animated-design.mp4" className="mt-4 inline-block bg-green-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-green-600">
            {t.downloadVideo}
          </a>
        </div>
      )}
    </ContentCard>
  );
};


// --- PAGE COMPONENTS ---
const HomePage = ({ t, setPage }: { t: any, setPage: (page: string) => void }) => {

  const managerNumber = "9840475210";
  const buttons = [
    { label: t.callNow, icon: 'phone-filled', action: () => window.location.href = `tel:${managerNumber}` },
    { label: t.whatsappMsg, icon: 'whatsapp', action: () => window.open(`https://wa.me/${managerNumber}?text=${encodeURIComponent(t.whatsappQuickMessage)}`) },
    { label: t.masonWork, icon: 'brick', action: () => setPage('services') },
    { label: t.buildingDesigns, icon: 'designs', action: () => setPage('designs') },
    { label: t.aiAssistant, icon: 'sparkles', action: () => setPage('ai-assistant') },
    { label: t.submitWork, icon: 'work', action: () => setPage('form') },
  ];

  return (
    <PageContainer>
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-yellow-300 drop-shadow-lg">{t.appName}</h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">{t.homeDesc}</p>
      </div>

      <div className="max-w-3xl mx-auto p-2">
        <div className="home-button-grid-container">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {buttons.map(btn => (
              <button key={btn.label} onClick={btn.action} className="home-button-card">
                <Icon name={btn.icon} className="w-10 h-10 mb-2" />
                <span className="font-semibold text-sm">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-12 text-gray-400">
        <p>Sandhiya Construction © 2025</p>
        <p className="text-sm">{t.createdBy}</p>
      </div>
    </PageContainer>
  );
};

const ServicesPage = ({ t }: { t: any }) => (
  <PageContainer>
    <ContentCard>
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">{t.servicesTitle}</h1>
      <ul className="space-y-4">
        {t.servicesList.map((service: string, index: number) => (
          <li key={index} className="flex items-start p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
            <Icon name="chevron-right" className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
            <span className="text-lg text-gray-200">{service}</span>
          </li>
        ))}
      </ul>
    </ContentCard>
  </PageContainer>
);

const DesignsPage = ({ t }: { t: any }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const designImages: { [key: string]: string[] } = {
    "Modern Architecture": ["https://i.imgur.com/mX7G2EE.jpeg", "https://i.imgur.com/iUTjFz6.jpeg", "https://i.imgur.com/9C3I4y3.jpeg"],
    "Column & Concrete Textures": ["https://i.imgur.com/kP0xG3g.jpeg", "https://i.imgur.com/1nBv5sA.jpeg", "https://i.imgur.com/VpT1sGU.jpeg"],
    "Artistic Brickwork": ["https://i.imgur.com/8VwL3bA.jpeg", "https://i.imgur.com/uPhmS4L.jpeg", "https://i.imgur.com/kye2Jt2.jpeg"],
    "Interior Finishing": ["https://i.imgur.com/lJ4a4YF.jpeg", "https://i.imgur.com/bA6X5r8.jpeg", "https://i.imgur.com/tHq8s6g.jpeg"],
    "Tile & Flooring Patterns": ["https://i.imgur.com/Q2yT82D.jpeg", "https://i.imgur.com/kFLT6kO.jpeg", "https://i.imgur.com/fMv7vjY.jpeg"],
    "Foundation & Structures": ["https://i.imgur.com/pA2k6Vq.jpeg", "https://i.imgur.com/dKqfKqS.jpeg", "https://i.imgur.com/XkMhG9z.jpeg"],
  };

  const icons: { [key: string]: string } = {
    "Modern Architecture": 'building', "Column & Concrete Textures": 'trowel', "Artistic Brickwork": 'brick',
    "Interior Finishing": 'services', "Tile & Flooring Patterns": 'tile', "Foundation & Structures": 'ruler',
  };

  return (
    <PageContainer>
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <VeoAnimator t={t} />
            </div>

            <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">{t.designsTitle}</h1>
            <div className="space-y-10">
                {t.designCategories.map((category: string) => (
                    <div key={category}>
                        <div className="flex items-center mb-4 ml-2">
                            <Icon name={icons[category] || 'building'} className="w-8 h-8 text-yellow-400 mr-3" />
                            <h2 className="text-2xl font-semibold text-white">{category}</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {(designImages[category] || []).map((src, index) => (
                                <div key={index} onClick={() => setSelectedImage(src)} className="group relative overflow-hidden rounded-lg shadow-lg aspect-square cursor-pointer">
                                    <img src={src} alt={`${category} ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                                      <Icon name="chevron-right" className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        {selectedImage && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                <div className="relative max-w-4xl max-h-[90vh] fade-in">
                    <img src={selectedImage} alt="Fullscreen view" className="w-full h-full object-contain rounded-lg" />
                    <button onClick={() => setSelectedImage(null)} className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2">
                        <Icon name="close" className="w-6 h-6" />
                    </button>
                </div>
            </div>
        )}
    </PageContainer>
);
};

const ContactPage = ({ t }: { t: any }) => (
  <PageContainer>
    <ContentCard>
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">{t.contactTitle}</h1>
      <div className="grid md:grid-cols-2 gap-8 text-lg">
        <div className="space-y-6">
          <div>
            <h2 className="font-bold text-xl mb-2 flex items-center"><Icon name="location" className="w-6 h-6 mr-2 text-yellow-400" /> {t.address}</h2>
            <p className="whitespace-pre-line leading-relaxed text-gray-300">{t.addressDetails}</p>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-2 flex items-center"><Icon name="phone-filled" className="w-6 h-6 mr-2 text-yellow-400" /> {t.phoneNumbers}</h2>
            <a href="tel:9840475210" className="block hover:text-yellow-400 text-gray-300">98404 75210</a>
            <a href="tel:9841975210" className="block hover:text-yellow-400 text-gray-300">98419 75210</a>
          </div>
        </div>
        <div className="space-y-4">
           <a href={`https://wa.me/9840475210?text=${encodeURIComponent(t.whatsappContactMessage)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors border border-gray-700/50">
            <Icon name="whatsapp" className="w-8 h-8 mr-4 text-green-500" />
            <span className="font-semibold text-gray-300">{t.whatsappSupport}</span>
          </a>
          <a href="https://www.facebook.com/share/17axXxEEhA/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors border border-gray-700/50">
            <Icon name="facebook" className="w-8 h-8 mr-4 text-blue-500" />
            <span className="font-semibold text-gray-300">{t.facebookPage}</span>
          </a>
          <div className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <Icon name="email" className="w-8 h-8 mr-4 text-gray-500" />
            <div>
              <h2 className="font-semibold text-gray-300">{t.emailAddress}</h2>
              <a href="mailto:Sandhiyaconstruction06@gmail.com" className="text-gray-300 hover:text-yellow-400 break-all">Sandhiyaconstruction06@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </ContentCard>
  </PageContainer>
);

const AboutPage = ({ t }: { t: any }) => (
  <PageContainer>
    <ContentCard>
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">{t.aboutTitle}</h1>
      <p className="text-lg leading-relaxed text-justify text-gray-300">{t.aboutText}</p>
    </ContentCard>
  </PageContainer>
);

const LanguagePage = ({ t, setLanguage, setPage }: { t: any, setLanguage: (lang: string) => void, setPage: (page: string) => void }) => {
  const selectLang = (lang: string) => {
    setLanguage(lang);
    setPage('home');
  };

  return (
    <PageContainer>
      <ContentCard className="max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6 text-yellow-400">{t.menuLanguage}</h1>
        <div className="space-y-4">
          <button onClick={() => selectLang('en')} className="w-full text-lg font-semibold p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors border border-gray-700/50">
            English
          </button>
          <button onClick={() => selectLang('ta')} className="w-full text-lg font-semibold p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors border border-gray-700/50">
            தமிழ் (Tamil)
          </button>
        </div>
      </ContentCard>
    </PageContainer>
  );
};

// --- LAYOUT COMPONENTS ---
const Header = ({ t, onShareClick }: { t: any, onShareClick: () => void }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/50 backdrop-blur-md z-40 border-b border-gray-800/50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-400/10 rounded-full">
              <Icon name="helmet" className="w-8 h-8 text-yellow-400" />
            </div>
            <span className="font-bold text-xl ml-3 text-white tracking-wider">{t.appName}</span>
          </div>
          <button onClick={onShareClick} className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
            <Icon name="share" className="w-6 h-6 text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

const NavigationBar = ({ navItems, activePage, onNavClick }: { navItems: any[], activePage: string, onNavClick: (page: string) => void }) => (
  <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50">
    <nav className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-full shadow-2xl shadow-black/30">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.slice(0, 5).map(item => (
          <button
            key={item.id}
            onClick={() => onNavClick(item.id)}
            className="relative flex flex-col items-center justify-center text-xs font-medium transition-colors duration-300 w-16 h-16 rounded-full"
          >
            <div className={`absolute inset-x-0 mx-auto top-1/2 -translate-y-1/2 w-16 h-9 nav-pill rounded-full transition-all duration-300 ease-in-out ${activePage === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
            <div className={`relative z-10 p-2 transition-transform duration-300 ${activePage === item.id ? '-translate-y-1' : ''}`}>
              <Icon name={item.icon} className={`w-7 h-7 mb-1 transition-colors ${activePage === item.id ? 'text-white' : 'text-gray-400'}`} />
            </div>
            <span className={`absolute bottom-1.5 z-10 transition-opacity duration-300 font-semibold ${activePage === item.id ? 'opacity-100 text-white' : 'opacity-0'}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  </div>
);

const EmergencyFAB = ({ t }: { t: any }) => {
  const managerNumber = "9840475210";
  return (
    <button onClick={() => window.location.href = `tel:${managerNumber}`} className="emergency-fab">
      <Icon name="emergency" className="w-8 h-8" />
    </button>
  );
};

// --- MAIN APP ---
const App = () => {
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [page, setPage] = useState('home');
  
  const t = translations[language as 'en' | 'ta'];
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.appName,
          text: `${t.homeDesc}. Check out the app!`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API not supported in your browser.');
    }
  };


  const renderPage = () => {
    switch (page) {
      case 'form':
        return <RequestForm t={t} onFormSubmit={() => setPage('home')} />;
      case 'home':
        return <HomePage t={t} setPage={setPage} />;
      case 'services':
        return <ServicesPage t={t} />;
      case 'designs':
        return <DesignsPage t={t} />;
      case 'contact':
        return <ContactPage t={t} />;
      case 'about':
        return <AboutPage t={t} />;
      case 'language':
        return <LanguagePage t={t} setLanguage={setLanguage} setPage={setPage} />;
      case 'ai-assistant':
        return <AIAssistant t={t} />;
      default:
        return <HomePage t={t} setPage={setPage} />;
    }
  };

  const navItems = [
    { id: 'home', icon: 'home', label: t.menuHome },
    { id: 'services', icon: 'services', label: t.menuServices },
    { id: 'designs', icon: 'designs', label: t.menuDesigns },
    { id: 'contact', icon: 'contact', label: t.menuContact },
    { id: 'about', icon: 'about', label: t.menuAbout },
  ];

  return (
    <div className="min-h-screen colorful-background">
      {page !== 'form' && <Header t={t} onShareClick={handleShare} />}
      
      <main className={page === 'form' ? 'h-screen flex items-center justify-center' : "pb-28 pt-20"} key={page}>
          {renderPage()}
      </main>

      {page === 'home' && <EmergencyFAB t={t} />}
      {page !== 'form' && <NavigationBar navItems={navItems} activePage={page} onNavClick={setPage} />}
    </div>
  );
};


export default App;