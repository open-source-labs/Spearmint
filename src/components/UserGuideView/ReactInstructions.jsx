import React from "react";


/**
 * Renders the video guide in the UserGuideView Component (Purely for when viewing the React TestType).
 * @returns { JSX.Element } Renders the ReactInstructions component
 */
const ReactInstructions = () => {

  return (
    <div>
      <iframe width="540" height="315" src="https://www.youtube.com/embed/R6xOJX9iVFs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  );
};

export default ReactInstructions;