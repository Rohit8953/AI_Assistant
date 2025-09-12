import { StarIcon } from "lucide-react";
import { dummyTestimonialData } from "../../assets/assets";

const Testimonial = () => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-6 pt-14">
        {dummyTestimonialData.map((data, index) => {
          return (
            <div
              key={index}
              className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5"
            >
              <div className="flex flex-col items-center px-5 py-4 relative">
                {/* Fixed self-closing tag for img and dynamic alt text for accessibility */}
                <img
                  src={data.image}
                  className="h-24 w-24 absolute -top-14 rounded-full object-cover"
                  alt={`${data.name}'s profile`}
                />
                <div className="pt-8 text-center">
                  <h1 className="text-lg font-medium text-gray-800">
                    {data.name}
                  </h1>
                  <p className="text-gray-800/80">{data.role}</p>
                </div>
              </div>
              {/* Used dynamic testimonial text from dummy data */}
              <p className="text-gray-500 px-6 text-center">
                {data.testimonial}
              </p>
              <div className="flex justify-center pt-4">
                <div className="flex gap-0.5">
                  {/* Render stars based on the 'rating' property in the dummy data */}
                  {[...Array(data.rating || 5)].map(
                    (
                      _,
                      i // Default to 5 stars if rating is not specified
                    ) => (
                      <StarIcon key={i} />
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonial;
