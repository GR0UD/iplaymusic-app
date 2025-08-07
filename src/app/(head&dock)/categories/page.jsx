import { useEffect } from "react";
import Header from "../../components/header";
import Dock from "../../components/dock";
import "../styles/pages/_categories.scss";
import Icons from "@/utils/icons";

const categoriesData = [
  {
    title: "Alternative",
    color: "hot-pink",
    subcategories: [
      "Indie Rock",
      "Alternative Pop",
      "Post-Punk Revival",
      "Dream Pop",
      "Grunge",
    ],
  },
  {
    title: "Blues",
    color: "red",
    subcategories: [
      "Acoustic Blues",
      "Blues Rock",
      "Canadian Blues",
      "Delta Blues",
      "Piano Blues",
      "Soul Blues",
      "Swamp Blues",
    ],
  },
  {
    title: "Classical",
    color: "orange",
    subcategories: [
      "Baroque",
      "Romantic",
      "Contemporary",
      "Orchestral",
      "Solo Piano",
    ],
  },
  {
    title: "Country",
    color: "yellow",
    subcategories: [
      "Classic Country",
      "Modern Country",
      "Outlaw Country",
      "Country Rock",
      "Bluegrass",
    ],
  },
  {
    title: "Dance",
    color: "green",
    subcategories: ["EDM", "House", "Trance", "Techno", "Electro Pop"],
  },
  {
    title: "Electronic",
    color: "dark-green",
    subcategories: ["Ambient", "Downtempo", "Drum & Bass", "Synthwave", "IDM"],
  },
  {
    title: "Fitness & Workout",
    color: "cyan",
    subcategories: [
      "Cardio Mix",
      "HIIT Beats",
      "Strength Training",
      "Running Tracks",
      "Gym Motivation",
    ],
  },
  {
    title: "Hip-hop/Rap",
    color: "blue",
    subcategories: [
      "Trap",
      "Boom Bap",
      "Lo-fi Rap",
      "Gangsta Rap",
      "Conscious Rap",
    ],
  },
  {
    title: "Industrial",
    color: "deep-blue",
    subcategories: [
      "Industrial Rock",
      "Dark Electro",
      "EBM",
      "Aggrotech",
      "Noise",
    ],
  },
];

export default function CategoriesPage() {
  useEffect(() => {
    const items = document.querySelectorAll(".categories__item");
    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (item.open) {
          items.forEach((other) => {
            if (other !== item) {
              other.removeAttribute("open");
            }
          });
        }
      });
    });

    // Cleanup to avoid duplicate listeners if component re-renders
    return () => {
      items.forEach((item) => {
        item.replaceWith(item.cloneNode(true));
      });
    };
  }, []);

  return (
    <>
      <Header heading='Categories' search={true} dark={false} />

      <main className='categories'>
        <section className='categories__section'>
          <h2 className='categories__title'>Categories</h2>

          <div className='categories__wrapper'>
            {categoriesData.map(({ title, color, subcategories }) => (
              <details key={title} className='categories__item'>
                <summary className={`categories__summary ${color}`}>
                  {title}
                  <Icons.dots size={20} />
                </summary>

                {subcategories && (
                  <div className='categories__sublist'>
                    {subcategories.map((sub) => (
                      <details key={sub} className='categories__subitem'>
                        <summary className='categories__subsummary'>
                          {sub}
                          <Icons.forward
                            size={20}
                            className='categories__arrow'
                          />
                        </summary>
                        <div className='categories__subcontent'>
                          <p>Content for {sub} subcategory.</p>
                        </div>
                      </details>
                    ))}
                  </div>
                )}
              </details>
            ))}
          </div>
        </section>
      </main>

      <Dock />
    </>
  );
}
