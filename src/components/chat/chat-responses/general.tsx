import { profile } from '@/data/portfolio';

const GeneralResponse = () => {
  return (
    <p className="text-sm leading-relaxed text-muted-foreground">
      Hey! I'm {profile.firstName}'s AI assistant. Ask me about his skills,
      projects, experience, or how to get in touch.
    </p>
  );
};

export default GeneralResponse;
