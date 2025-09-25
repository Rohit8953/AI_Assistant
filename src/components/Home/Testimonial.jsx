import { StarIcon } from "lucide-react";
import { dummyTestimonialData } from "../../assets/assets";

const Testimonial = () => {
    const CreateCard = ({ card }) => (
        <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl 
            border border-gray-100 hover:border-blue-100 transition-all duration-500 
            w-80 shrink-0 mx-4 backdrop-blur-sm transform hover:-translate-y-2">
            
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] 
                transition-transform duration-1000"></div>

            {/* User Header */}
            <div className="flex items-start gap-4 mb-6 relative z-10">
                <div className="relative">
                    <img 
                        className="size-14 rounded-2xl border-2 border-white shadow-lg" 
                        src={card.image} 
                        alt={card.name} 
                    />
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 
                        rounded-full p-1 shadow-lg">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" 
                                d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" 
                                fill="white" 
                            />
                        </svg>
                    </div>
                </div>
                
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900 text-lg">{card.name}</h4>
                    </div>
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
                        {card.handle}
                    </span>
                </div>
            </div>

            {/* Star Rating */}
            <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                    <StarIcon 
                        key={i}
                        className={`w-4 h-4 ${
                            i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                        }`}
                    />
                ))}
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
                <h5 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                    {card.title}
                </h5>
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {card.content}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-gray-500 text-sm relative z-10">
                <div className="flex items-center gap-2">
                    <span>Posted on</span>
                    <a 
                        href="https://x.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition-colors duration-200"
                    >
                        <svg width="16" height="16" viewBox="0 0 11 10" fill="currentColor">
                            <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" />
                        </svg>
                    </a>
                </div>
                <span className="font-medium text-gray-700">{card.date}</span>
            </div>
        </div>
    );

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-0"></div>
            <div className="absolute top-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 px-4 sm:px-20 xl:px-32 mb-16">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-2 mb-6 shadow-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-700">
                            Trusted by thousands of creators
                        </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent mb-6">
                        What People Say
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Don't just take our word for it. Here's what our community 
                        <span className="font-semibold text-gray-800"> has to say about their experience</span>
                    </p>
                </div>
            </div>

            {/* Marquee Sections */}
            <div className="relative">
                {/* Top Marquee */}
                <div className="marquee-row w-full overflow-hidden relative mb-8">
                    <div className="absolute left-0 top-0 h-full w-32 z-20 bg-gradient-to-r from-white to-transparent"></div>
                    <div className="marquee-inner flex transform-gpu min-w-[200%] py-8">
                        {[...dummyTestimonialData, ...dummyTestimonialData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-32 z-20 bg-gradient-to-l from-white to-transparent"></div>
                </div>

                {/* Bottom Marquee */}
                <div className="marquee-row w-full overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-32 z-20 bg-gradient-to-r from-white to-transparent"></div>
                    <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] py-8">
                        {[...dummyTestimonialData, ...dummyTestimonialData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-32 z-20 bg-gradient-to-l from-white to-transparent"></div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative z-10 mt-16 px-4">
                <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
                            <div className="text-sm text-gray-600">Average Rating</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                            <div className="text-sm text-gray-600">Happy Users</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
                            <div className="text-sm text-gray-600">Satisfaction</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                            <div className="text-sm text-gray-600">Support</div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }

                .marquee-inner {
                    animation: marqueeScroll 40s linear infinite;
                }

                .marquee-reverse {
                    animation-direction: reverse;
                }

                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
};

export default Testimonial;