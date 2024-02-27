import { ICategory } from '@shared/services/category/category.interface';
import { Category } from '@core/enums/category';

export class CategoryService {
  categories: ICategory[];

  constructor() {
    this.categories = [
      {
        name: Category.TextBooksEducationalMaterial,
        includes: 'Libros de texto, diccionarios, entre otros.',
        withGender: false,
      },
      {
        name: Category.OfficeSupplies,
        includes:
          'Papel, bolígrafos, lápices, carpetas, organizadores, impresoras, tinta, grapadoras, entre otros.',
        withGender: false,
      },
      {
        name: Category.Electronics,
        includes:
          'Laptops, monitores, computadoras, teclados, mouse, tablets, impresoras, discos duros externos, auriculares, cargadores, adaptadores, cargadores, cámaras fotográficas, reproductores de música, videoconsolas, calculadoras científicas, entre otros.',
        withGender: false,
      },
      {
        name: Category.FurnitureAndDecoration,
        includes:
          'Escritorios, sillas ergonómicas, estanterías, lámparas de escritorio, organizadores de almacenamiento, pósters motivacionales, elementos decorativos para el dormitorio o la sala de estudio, entre otros.',
        withGender: false,
      },
      {
        name: Category.Clothing,
        includes:
          'Ropa, calzado, uniformes, trajes formales, collares, pulseras, relojes, carteras, gafas de sol, entre otros.',
        withGender: true,
      },
      {
        name: Category.LaboratoryMaterial,
        includes:
          'Microscopios, bata de laboratorio, tubos de ensayo, entre otros.',
        withGender: false,
      },
      {
        name: Category.MusicalInstruments,
        includes:
          'Guitarras, pianos, baterías, instrumentos de viento, entre otros.',
        withGender: false,
      },
      {
        name: Category.SportingGoods,
        includes:
          'Bicicletas, balones, accesorios, raquetas, equipos de gimnasio, patines, entre otros.',
        withGender: false,
      },
      {
        name: Category.ArtsHandicrafts,
        includes:
          'Pinturas, pinceles, arcilla, herramientas para manualidades, kits de arte, entre otros.',
        withGender: false,
      },
      {
        name: Category.ToysGames,
        includes:
          'Juegos de mesa, juguetes educativos, figuras de acción, puzzles, entre otros.',
        withGender: true,
      },
    ];
  }

  getIncludes(category: Category): string {
    return this.getCategory(category, 'includes');
  }

  isWithGender(category: Category): boolean {
    return this.getCategory(category, 'withGender');
  }

  private getCategory(category: Category, checkProperty: string) {
    const objectCategory: ICategory = this.categories.find(
      c => c.name === category
    ) as ICategory;
    const index = Object.keys(objectCategory).indexOf(checkProperty);
    return Object.values(objectCategory)[index];
  }
}
