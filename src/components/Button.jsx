const Button = ({ text, className, id }) => {
  return (
    <a className={`${className ?? ''} cta-wrapper`}>
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
  )
}

export default Button