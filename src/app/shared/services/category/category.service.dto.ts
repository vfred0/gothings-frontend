import { ICategory } from '@shared/services/category/category.interface';
import { CategoryEnum } from '@core/enums/category.enum';

export class CategoryService {
  categories: ICategory[];

  constructor() {
    this.categories = [
      {
        name: CategoryEnum.TextBooksEducationalMaterial,
        includes: 'Libros de texto, diccionarios, entre otros.',
        withGender: false,
      },
      {
        name: CategoryEnum.OfficeSupplies,
        includes:
          'Papel, bolígrafos, lápices, carpetas, organizadores, impresoras, tinta, grapadoras, entre otros.',
        withGender: false,
      },
      {
        name: CategoryEnum.Electronics,
        includes:
          'Laptops, monitores, computadoras, teclados, mouse, tablets, impresoras, discos duros externos, auriculares, cargadores, adaptadores, cargadores, cámaras fotográficas, reproductores de música, videoconsolas, calculadoras científicas, entre otros.',
        withGender: false,
      },
      {
        name: CategoryEnum.FurnitureAndDecoration,
        includes:
          'Escritorios, sillas ergonómicas, estanterías, lámparas de escritorio, organizadores de almacenamiento, pósters motivacionales, elementos decorativos para el dormitorio o la sala de estudio, entre otros.',
        withGender: false,
      },
      {
        name: CategoryEnum.Clothing,
        includes:
          'Ropa, calzado, uniformes, trajes formales, collares, pulseras, relojes, carteras, gafas de sol, entre otros.',
        withGender: true,
      },
      {
        name: CategoryEnum.LaboratoryMaterial,
        includes:
          'Microscopios, bata de laboratorio, tubos de ensayo, entre otros.',
        withGender: false,
      },
      {
        name: CategoryEnum.MusicalInstruments,
        includes:
          'Guitarras, pianos, baterías, instrumentos de viento, entre otros.',
        withGender: false,
      },
      {
        name: CategoryEnum.SportingGoods,
        includes:
          'Bicicletas, balones, accesorios, raquetas, equipos de gimnasio, patines, entre otros.',
        withGender: false,
      },
      {
        name: CategoryEnum.ArtsHandicrafts,
        includes:
          'Pinturas, pinceles, arcilla, herramientas para manualidades, kits de arte, entre otros.',
        withGender: false,
      },
      {
        name: CategoryEnum.ToysGames,
        includes:
          'Juegos de mesa, juguetes educativos, figuras de acción, puzzles, entre otros.',
        withGender: true,
      },
    ];
  }

  getIncludes(category: CategoryEnum): string {
    return this.categories.find(this.getCategory(category))?.includes || '';
  }

  isWithGender(category: CategoryEnum) {
    return (
      this.categories.find(this.getCategory(category))?.withGender || false
    );
  }

  private getCategory(category: CategoryEnum) {
    return (c: ICategory) => c.name === category;
  }
}
