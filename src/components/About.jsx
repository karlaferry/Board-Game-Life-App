import React from "react";
import "../App.css";
import github from "../img/github.png";
import gmail from "../img/gmail.png";
import twitter from "../img/twitter.png";
import linkedin from "../img/linkedin.png";
import source from "../img/source-code.png";
export default function About() {
  return (
    <div>
      <div>
        <h2>About This Site</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
          praesentium quam consequatur reprehenderit possimus id quidem eos
          culpa numquam. Dolore doloremque necessitatibus similique odio at
          quisquam quos quasi atque! Doloremque, hic doloribus, repellendus
          maiores veniam ullam, aliquid magni eum aut expedita iusto sequi
          molestias voluptates? Ab voluptatum soluta consectetur earum.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
          distinctio natus quibusdam, dolore assumenda in fuga necessitatibus
          nostrum doloribus ratione recusandae dolores, id harum magnam culpa ad
          numquam nemo neque illum eaque? Autem adipisci commodi sequi velit?
          Quidem nihil minus blanditiis consectetur nobis sapiente itaque!
          Inventore, ipsum deserunt? Expedita, quod.
        </p>
      </div>
      <div>
        <h2>Links</h2>
        <div>
          <div>
            <img src={github} alt="" width="10%" />
            <p>Source Code</p>
          </div>
          <div>
            <img src={source} alt="" width="10%" />
            <p>Backend API Repo</p>
          </div>
        </div>
      </div>
      <div>
        <h2>Developer</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          molestias libero necessitatibus amet fuga voluptas possimus laudantium
          quisquam inventore. Repudiandae.
        </p>
        <h3>Contact</h3>
        <img src={github} alt="" width="10%" />
        <img src={linkedin} alt="" width="10%" />
        <img src={gmail} alt="" width="10%" />
        <img src={twitter} alt="" width="10%" />
      </div>
    </div>
  );
}
