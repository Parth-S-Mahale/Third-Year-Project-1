import React from "react";
import { Link } from "react-router-dom";
import { Handshake, Users, Globe, BookOpen, Zap, ArrowRight } from "lucide-react";

// Helper component for Feature Cards
const FeatureCard = ({ icon, title, description }) => (
    <div className="card bg-base-200/50 backdrop-blur-sm shadow-lg border border-primary/10 transition-all duration-300 hover:border-primary/30 hover:shadow-primary/10">
        <div className="card-body items-center text-center p-6">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
                {icon}
            </div>
            <h3 className="card-title text-lg font-semibold">{title}</h3>
            <p className="text-base-content/70">{description}</p>
        </div>
    </div>
);


const LandingPage = () => {
    return (
        <div data-theme="forest" className="bg-base-100 text-base-content min-h-screen">
            {/* Header / Navbar */}
            <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300">
                <div className="container mx-auto navbar px-4 sm:px-6 lg:px-8">
                    <div className="navbar-start">
                        <Link to="/" className="flex items-center gap-2">
                            <Handshake className="size-8 text-primary" />
                            <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                                KaushalX
                            </span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <section className="relative py-20 md:py-32 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-grid-primary/10 [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                            Learn Anything. Teach Anything.
                        </h1>
                        <p className="h-24 text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-6">
                            Pay Nothing.
                        </p>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-base-content/70 mb-10">
                            Join a global community where skills are the new currency. Exchange your knowledge, not your money.
                        </p>
                        <Link to="/signup" className="btn btn-primary btn-lg group">
                            Get Started for Free
                            <ArrowRight className="size-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-base-200/50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold">The New Way to Learn</h2>
                            <p className="text-lg text-base-content/70 mt-2">Grow together on KaushalX.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard 
                                icon={<Users className="size-8 text-primary"/>}
                                title="Peer-to-Peer Learning"
                                description="Connect directly with individuals who have the skills you want to learn, and teach what you know in return."
                            />
                            <FeatureCard 
                                icon={<Globe className="size-8 text-primary"/>}
                                title="Global Community"
                                description="Access a diverse, worldwide network of learners, experts, and enthusiasts from every field imaginable."
                            />
                            <FeatureCard 
                                icon={<Zap className="size-8 text-primary"/>}
                                title="Zero Cost, Infinite Value"
                                description="Forget expensive courses. Your willingness to teach is your ticket to learn, making education accessible to all."
                            />
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold">Get Started in 3 Easy Steps</h2>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                            <div className="text-center max-w-xs">
                                <div className="text-6xl font-bold text-primary/30 mb-2">1</div>
                                <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                                <p className="text-base-content/70">Sign up and list the skills you have and the skills you want to learn.</p>
                            </div>
                             <div className="text-primary/30 hidden md:block">→</div>
                            <div className="text-center max-w-xs">
                                 <div className="text-6xl font-bold text-primary/30 mb-2">2</div>
                                <h3 className="text-xl font-semibold mb-2">Find a Partner</h3>
                                <p className="text-base-content/70">Browse our community to find the perfect partner for a skill exchange.</p>
                            </div>
                             <div className="text-primary/30 hidden md:block">→</div>
                            <div className="text-center max-w-xs">
                                 <div className="text-6xl font-bold text-primary/30 mb-2">3</div>
                                <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
                                <p className="text-base-content/70">Connect with your partner via chat and video to start sharing knowledge.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-base-200 border-t border-base-300">
                <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-base-content/60">
                    <p>&copy; {new Date().getFullYear()} KaushalX. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
