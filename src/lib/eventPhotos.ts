/**
 * Photographs from real Fresh Start sessions.
 *
 * These are the actual rooms, students and instructors — not stock. Alt text
 * follows the same rule as the program photography in `programs.ts`: describe
 * the scene, name nobody. Several aprons in these shots are embroidered with a
 * student's first name; those names stay out of the alt text deliberately.
 *
 * Orientation is baked into the pixels and all EXIF (including GPS) is stripped
 * from the files in `public/events/`, so nothing rotates unexpectedly once an
 * optimizer re-encodes them and no location data ships with a photo of a child.
 *
 * ORDER IS DELIBERATE. The collection is heavily weighted toward the cake
 * decorating sessions — that is simply what has been photographed most — so the
 * sewing, textiles and craft frames are interleaved through the opening rows
 * rather than left to sort themselves to the bottom. Otherwise the gallery
 * reads as a single-subject album and undersells the rest of the programs.
 *
 * A few of these double as feature images elsewhere: the sewing lesson and the
 * cutting bench carry the programs that teach them, the group shot fronts cake
 * decorating, and the finished skirt anchors the impact section on the
 * homepage. Reuse is intentional — the gallery is the full set, the other
 * placements are the strongest single frame for the point being made.
 */

export type EventPhoto = {
  /** Path under `public/`. */
  src: string;
  /** Describes the scene. Names nobody. */
  alt: string;
  category: "baking" | "sewing" | "craft";
  /**
   * Landscape frame. The gallery gives these a two-column tile at 3:2 instead
   * of the standard 3:4 portrait tile — a group photograph centre-cropped into
   * a portrait tile loses the people standing at either end of the line.
   */
  wide?: boolean;
};

export const eventPhotos: EventPhoto[] = [
  {
    src: "/events/sewing-instructor-machine.jpg",
    alt: "An instructor sitting alongside a young student guiding fabric through a sewing machine.",
    category: "sewing",
  },
  {
    src: "/events/cake-club-boy-piping-icing.jpg",
    alt: "A student concentrating as he pipes red icing onto a cake.",
    category: "baking",
  },
  {
    src: "/events/sewing-finished-purple-skirt.jpg",
    alt: "A student holding up a finished purple floral skirt she sewed herself.",
    category: "sewing",
  },
  {
    src: "/events/cake-club-students-group-aprons.jpg",
    alt: "Students in aprons and chef hats standing together behind trays of the cupcakes they decorated.",
    category: "baking",
    wide: true,
  },
  {
    src: "/events/sewing-cutting-floral-fabric.jpg",
    alt: "A student cutting a pink floral fabric panel with fabric shears.",
    category: "sewing",
  },
  {
    src: "/events/cake-club-proud-cupcake.jpg",
    alt: "A student grinning as he holds up the cupcake he decorated.",
    category: "baking",
  },
  {
    src: "/events/candle-making-pouring-wax.jpg",
    alt: "A student pouring scented wax into a jar at a candle-making workshop, fragrance oils and finished candles on the table.",
    category: "craft",
    wide: true,
  },
  {
    src: "/events/sewing-finished-yellow-skirt.jpg",
    alt: "A student holding up a finished yellow floral skirt made in the sewing workshop.",
    category: "sewing",
  },
  {
    src: "/events/cake-club-piping-rosettes.jpg",
    alt: "A student piping a border of blue rosettes around the edge of a cake.",
    category: "baking",
  },
  {
    src: "/events/cake-club-class-photo.jpg",
    alt: "A full Cake Club group in matching aprons, from the youngest students to the teenagers.",
    category: "baking",
    wide: true,
  },
  {
    src: "/events/sewing-pressing-fabric.jpg",
    alt: "An instructor showing a student how to press a seam flat before stitching.",
    category: "sewing",
  },
  {
    src: "/events/cake-club-icing-smiles.jpg",
    alt: "One of the youngest students beaming, icing on his face, holding a cupcake.",
    category: "baking",
  },
  {
    src: "/events/sewing-pattern-layout.jpg",
    alt: "A student laying out a paper sewing pattern across fabric before cutting.",
    category: "sewing",
  },
  {
    src: "/events/cake-club-student-blue-cupcakes.jpg",
    alt: "A student in a chef hat smiling beside the tray of blue-iced cupcakes she finished.",
    category: "baking",
  },
  {
    src: "/events/music-workshop-production-lab.jpg",
    alt: "Students in headphones producing music on MIDI keyboards and Macs at the musical workshop.",
    category: "craft",
    wide: true,
  },
  {
    src: "/events/sewing-marking-pattern.jpg",
    alt: "A student marking a pattern piece at a sewing station.",
    category: "sewing",
  },
  {
    src: "/events/cake-club-youngest-baker.jpg",
    alt: "A toddler in an apron and chef hat at the decorating table with a tray of iced cupcakes.",
    category: "baking",
  },
  {
    src: "/events/sewing-fitting-garment.jpg",
    alt: "An instructor helping a student pin and fit a floral garment.",
    category: "sewing",
  },
  {
    src: "/events/cake-club-decorating-cupcakes.jpg",
    alt: "Students in aprons and chef hats piping blue icing onto trays of cupcakes.",
    category: "baking",
  },
  {
    src: "/events/craft-painting-figurine.jpg",
    alt: "A student painting a plaster figurine at the craft table.",
    category: "craft",
  },
  {
    src: "/events/cake-club-teens-finished-cake.jpg",
    alt: "Two teenage students holding up the decorated cake they finished together.",
    category: "baking",
  },
  {
    src: "/events/cake-club-sharing-piping-bag.jpg",
    alt: "An older student steadying a piping bag while a younger one squeezes out purple icing.",
    category: "baking",
  },
  {
    src: "/events/cake-club-finished-cake-boxed.jpg",
    alt: "A student smiling at the finished cake she is carrying out in a bakery box.",
    category: "baking",
  },
  {
    src: "/events/cake-club-icing-with-spatula.jpg",
    alt: "A student spreading icing across a sheet cake with an offset spatula.",
    category: "baking",
  },
  {
    src: "/events/cake-club-teens-frosting-cake.jpg",
    alt: "Teenage students working together to frost a tall white layer cake.",
    category: "baking",
  },
  {
    src: "/events/cake-club-student-superhero-hat.jpg",
    alt: "A student in a bright chef hat and apron pausing at the decorating table.",
    category: "baking",
  },
  {
    src: "/events/cake-club-instructor-frosting.jpg",
    alt: "An instructor in a Cake Club apron smoothing frosting over a layer cake.",
    category: "baking",
  },
  {
    src: "/events/cake-club-adding-sprinkles.jpg",
    alt: "Two students adding sprinkles and decorations to their cupcakes.",
    category: "baking",
  },
  {
    src: "/events/cake-club-piping-practice.jpg",
    alt: "Students practising piping patterns on parchment before decorating the real cupcakes.",
    category: "baking",
  },
  {
    src: "/events/cake-club-decorating-tables.jpg",
    alt: "A long decorating table mid-session, students working along both sides.",
    category: "baking",
  },
  {
    src: "/events/cake-club-instructor-mixing.jpg",
    alt: "An instructor in a chef hat working through a mixing step with two students.",
    category: "baking",
  },
  {
    src: "/events/cake-club-group-with-cupcakes.jpg",
    alt: "Students and instructors gathered behind a table lined with finished cupcakes.",
    category: "baking",
  },
  {
    src: "/events/cake-club-finished-cupcake.jpg",
    alt: "A student in a Cake Club apron holding up the cupcake she decorated.",
    category: "baking",
  },
  {
    src: "/events/cake-club-layer-cake-teens.jpg",
    alt: "Two teenage students in aprons working on a layer cake with an instructor.",
    category: "baking",
  },
  {
    src: "/events/cake-club-helping-students.jpg",
    alt: "An instructor working with students around the cake decorating table.",
    category: "baking",
  },
  {
    src: "/events/cake-club-instructors-icing.jpg",
    alt: "Instructors icing and slicing cake during a Cake Club session.",
    category: "baking",
  },
];
