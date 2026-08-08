import { profile } from '@/data/portfolio';

const AboutResponse = () => {
  return (
    <div>
      <h3 className="mb-2 font-serif text-base font-semibold text-foreground">
        About me
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {profile.bio}
      </p>
    </div>
  );
};

export default AboutResponse;
