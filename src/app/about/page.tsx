import Navbar from "@/components/ui/navbar/navbar";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar
        headerImage="/logo.svg"
        nepaliDate="आज मिति: २०८१ असोज २५ गते, आइतबार"
      />
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            About Thami Dictionary
          </h1>
          
          <div className="bg-card rounded-xl p-8 shadow-lg border border-border mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
              Our Mission
            </h2>
            <p className="text-muted-foreground mb-4">
              Thami Dictionary is dedicated to preserving and promoting the Thami language, 
              an indigenous language of Nepal. Our mission is to create a comprehensive digital 
              resource that makes the Thami language accessible to speakers, learners, and researchers worldwide.
            </p>
            <p className="text-muted-foreground">
              We believe that language is the cornerstone of cultural identity, and by documenting 
              and sharing the Thami language, we help ensure its survival for future generations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                Language Preservation
              </h3>
              <p className="text-muted-foreground">
                Our dictionary serves as a living archive of Thami vocabulary, phrases, and 
                expressions, capturing the linguistic heritage of the Thami people.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                Community Driven
              </h3>
              <p className="text-muted-foreground">
                We work closely with native Thami speakers, linguists, and community members 
                to ensure accuracy and authenticity in our translations and definitions.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                Educational Resource
              </h3>
              <p className="text-muted-foreground">
                Our platform provides learning materials and resources for those interested 
                in studying the Thami language and understanding its cultural context.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                Digital Accessibility
              </h3>
              <p className="text-muted-foreground">
                By creating a digital dictionary, we make the Thami language accessible to 
                people around the world, supporting both preservation and global awareness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;