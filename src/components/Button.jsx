const Button = ({ text, className, id }) => {
  return (
    <a
      // Handle click event for smooth scrolling
      onClick={(e) => {
        e.preventDefault(); // Prevent default anchor behavior

        // Get the target element by ID 'counter'
        const target = document.getElementById("work");

        // If target exists and id prop is provided
        if (target && id) {
          // Calculate offset (15% of window height)
          const offset = window.innerHeight * 0.15;

          // Calculate the scroll position for the target minus offset
          const top = target.getBoundingClientRect().top + window.scrollY - offset;

          // Smoothly scroll to the calculated position
          window.scrollTo({ top, behavior: "smooth" });
        }
      }}
      // Combine passed className with default class
      className={`${className ?? ""} cta-wrapper`}
    >
      {/* nullish coalescing operator ?? = if exist tho use else aka(null,undefined) " " */}
      {/* this div is for rainbow effect : opional ha fully */}
      <div className="p-[2px] bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 rounded-lg">
        <div className="cta-button group">
          <div className="bg-circle " />
          <p className="text">{text}</p>
          <div className="arrow-wrapper">
            <img src="/images/arrow-down.svg" alt="arrow" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default Button;
