const mongoose = require('mongoose');
const { Schema } = mongoose;

// Gestion des événements MongoDB
mongoose.connection.on('connected', () => {
  console.log('Connexion à MongoDB réussie');
});

mongoose.connection.on('error', (err) => {
  console.error('Erreur de connexion à MongoDB :', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Déconnecté de MongoDB');
});

// Connexion à MongoDB
mongoose.connect('mongodb://admin:secret@mongo_db:27017/btp_module_db', {
  authSource: 'admin',
  connectTimeoutMS: 30000,
});

// Schémas des collections
const chantierSchema = new Schema({
  numero: String,
  title: String,
  description: String,
  notes: [String],
  commentaires: [String],
  client: String,
  status: String,
  debut_prevu: Date,
  fin_prevu: Date,
  personnels: [{ type: Schema.Types.ObjectId, ref: 'Personnel' }],
  fournitures: [{ type: Schema.Types.ObjectId, ref: 'Fourniture' }],
  outillages: [{ type: Schema.Types.ObjectId, ref: 'Outils' }],
  devis: [{ type: Schema.Types.ObjectId, ref: 'Devis' }],
  adresse: String,
  code_postal: String,
  ville: String,
  localisation: { lon: Number, lat: Number },
});

const devisSchema = new Schema({
  numero: String,
  title: String,
  description: String,
  notes: String,
  client: String,
  status: String,
  debut_prevu: Date,
  fin_prevu: Date,
  date_echeance: Date,
  mode_reglement: String,
  tva: String,
  devis_lines: [String],
});

const fournitureSchema = new Schema({
  name: String,
  description: String,
  unit: String,
  quantity: Number,
  total_price: Number,
});

const outilsSchema = new Schema({
  name: String,
  type: String,
  available: Boolean,
  quantity: Number,
  quantity_available: Number,
});

const personnelSchema = new Schema({
  name: String,
  role: String,
  active: Boolean,
  phone: String,
  email: String,
});

// Création des modèles
const Chantier = mongoose.model('Chantier', chantierSchema);
const Devis = mongoose.model('Devis', devisSchema);
const Fourniture = mongoose.model('Fourniture', fournitureSchema);
const Outils = mongoose.model('Outils', outilsSchema);
const Personnel = mongoose.model('Personnel', personnelSchema);

// Fonction de seed
async function seedDatabase() {
  try {
    const chantierCount = await Chantier.countDocuments();
    if (chantierCount > 0) {
      console.log('La base de données est déjà peuplée. Aucun seed nécessaire.');
      return;
    }

    // Suppression des données existantes
    await Chantier.deleteMany();
    await Devis.deleteMany();
    await Fourniture.deleteMany();
    await Outils.deleteMany();
    await Personnel.deleteMany();

    // Création des données de seed
    const personnels = await Personnel.insertMany([
      { name: 'Jean Dupont', role: 'Carreleur', active: true, phone: '0601234567', email: 'jean.dupont@mail.com' },
      { name: 'Marie Curie', role: 'Chef de chantier', active: true, phone: '0612345678', email: 'marie.curie@mail.com' },
      { name: 'Paul Martin', role: 'Chapeur', active: true, phone: '0623456789', email: 'paul.martin@mail.com' },
      { name: 'Lucie Bernard', role: 'Assistante', active: true, phone: '0634567890', email: 'lucie.bernard@mail.com' },
      { name: 'Marc Leclerc', role: 'Carreleur', active: true, phone: '0645678901', email: 'marc.leclerc@mail.com' },
      { name: 'Sophie Garnier', role: 'Technicienne', active: true, phone: '0656789012', email: 'sophie.garnier@mail.com' },
      { name: 'Antoine Dubois', role: 'Ouvrier polyvalent', active: true, phone: '0667890123', email: 'antoine.dubois@mail.com' },
      { name: 'Emma Robert', role: 'Technicienne', active: true, phone: '0678901234', email: 'emma.robert@mail.com' },
      { name: 'Lucas Moreau', role: 'Conducteur d’engins', active: true, phone: '0689012345', email: 'lucas.moreau@mail.com' },
      { name: 'Clara Petit', role: 'Gestionnaire', active: true, phone: '0690123456', email: 'clara.petit@mail.com' },
    ]);

    const outils = await Outils.insertMany([
      { name: 'Marteau', type: 'Outil de base', available: true, quantity: 10, quantity_available: 10 },
      { name: 'Truelle', type: 'Outil de finition', available: true, quantity: 5, quantity_available: 5 },
      { name: 'Niveau à bulle', type: 'Outil de mesure', available: true, quantity: 5, quantity_available: 5 },
      { name: 'Scie circulaire', type: 'Outil électrique', available: true, quantity: 3, quantity_available: 3 },
      { name: 'Perceuse', type: 'Outil électrique', available: true, quantity: 4, quantity_available: 4 },
      { name: 'Visseuse', type: 'Outil électrique', available: true, quantity: 6, quantity_available: 6 },
      { name: 'Pelle', type: 'Outil de chantier', available: true, quantity: 8, quantity_available: 8 },
      { name: 'Brouette', type: 'Outil de transport', available: true, quantity: 4, quantity_available: 4 },
      { name: 'Cutter', type: 'Outil de coupe', available: true, quantity: 7, quantity_available: 7 },
      { name: 'Laser de mesure', type: 'Outil de mesure', available: true, quantity: 2, quantity_available: 2 },
    ]);

    const fournitures = await Fourniture.insertMany([
      { name: 'Carrelage 30x30', description: 'Carrelage blanc pour salle de bain', unit: 'm²', quantity: 50, total_price: 525 },
      { name: 'Parquet chêne massif', description: 'Parquet haut de gamme', unit: 'm²', quantity: 20, total_price: 700 },
      { name: 'Ciment rapide', description: 'Ciment à prise rapide pour chape', unit: 'kg', quantity: 100, total_price: 800 },
      { name: 'Adhésif de carrelage', description: 'Colle pour carrelage', unit: 'kg', quantity: 50, total_price: 750 },
      { name: 'Joint silicone', description: 'Joint pour étanchéité', unit: 'tube', quantity: 30, total_price: 150 },
      { name: 'Plinthe en bois', description: 'Plinthe assortie au parquet', unit: 'm', quantity: 100, total_price: 1200 },
      { name: 'Peinture murale blanche', description: 'Peinture acrylique', unit: 'L', quantity: 20, total_price: 500 },
      { name: 'Carrelage imitation bois', description: 'Carrelage effet parquet', unit: 'm²', quantity: 40, total_price: 720 },
      { name: 'Produit de nettoyage', description: 'Nettoyant pour carrelage', unit: 'L', quantity: 30, total_price: 240 },
      { name: 'Film polyane', description: 'Film étanche pour chape', unit: 'm²', quantity: 100, total_price: 300 },
    ]);

    const devis = await Devis.insertMany([
      {
        numero: 'DV-001',
        title: 'Devis rénovation salle de bain',
        description: 'Pose de carrelage et finition',
        notes: 'Inclure les finitions murales',
        client: 'Jean Dupont',
        status: 'En attente',
        debut_prevu: new Date('2024-12-01'),
        fin_prevu: new Date('2024-12-15'),
        date_echeance: new Date('2024-12-20'),
        mode_reglement: 'Chèque',
        tva: '20%',
        devis_lines: ['Carrelage 30x30', 'Pose complète'],
      },
    ]);

    await Chantier.insertMany([
      {
        numero: 'CH-001',
        title: 'Rénovation salle de bain Dupont',
        description: 'Pose de carrelage et finition murale',
        notes: 'Prévoir des joints en silicone',
        commentaires: 'Début prévu le 01/12/2024',
        client: 'Jean Dupont',
        status: 'En cours',
        debut_prevu: new Date('2024-12-01'),
        fin_prevu: new Date('2024-12-15'),
        personnels: [personnels[0]._id, personnels[1]._id],
        fournitures: [fournitures[0]._id, fournitures[3]._id],
        outillages: [outils[0]._id, outils[1]._id],
        devis: [devis[0]._id],
        adresse: '12 Rue des Lilas',
        code_postal: '75012',
        ville: 'Paris',
        localisation: { lon: 2.379853, lat: 48.856614 },
      },
      {
        numero: 'CH-002',
        title: 'Installation parquet Curie',
        description: 'Pose de parquet haut de gamme',
        notes: 'Vérifier le stock de plinthes',
        commentaires: 'Travaux prévus pour janvier 2025',
        client: 'Marie Curie',
        status: 'À venir',
        debut_prevu: new Date('2025-01-15'),
        fin_prevu: new Date('2025-01-30'),
        personnels: [personnels[2]._id, personnels[3]._id],
        fournitures: [fournitures[1]._id, fournitures[5]._id],
        outillages: [outils[4]._id, outils[6]._id],
        devis: [],
        adresse: '45 Avenue des Champs',
        code_postal: '75008',
        ville: 'Paris',
        localisation: { lon: 2.307922, lat: 48.870920 },
      },
      {
        numero: 'CH-003',
        title: 'Rénovation terrasse Dubois',
        description: 'Pose chape et carrelage extérieur',
        notes: 'Vérifier les conditions météo',
        commentaires: 'Travaux prévus pour février 2025',
        client: 'Antoine Dubois',
        status: 'À venir',
        debut_prevu: new Date('2025-02-01'),
        fin_prevu: new Date('2025-02-15'),
        personnels: [personnels[4]._id, personnels[5]._id],
        fournitures: [fournitures[2]._id, fournitures[4]._id],
        outillages: [outils[7]._id, outils[8]._id],
        devis: [],
        adresse: '12 Rue des Tilleuls',
        code_postal: '59000',
        ville: 'Lille',
        localisation: { lon: 3.057256, lat: 50.629250 },
      },
      {
        numero: 'CH-004',
        title: 'Réhabilitation cuisine Bernard',
        description: 'Pose de carrelage mural et sol',
        notes: 'Prévoir carrelage anti-dérapant',
        commentaires: 'Finalisé le 15/11/2024',
        client: 'Lucie Bernard',
        status: 'Terminé',
        debut_prevu: new Date('2024-11-01'),
        fin_prevu: new Date('2024-11-15'),
        personnels: [personnels[0]._id, personnels[6]._id],
        fournitures: [fournitures[6]._id, fournitures[7]._id],
        outillages: [outils[3]._id, outils[5]._id],
        devis: [],
        adresse: '45 Rue des Roses',
        code_postal: '69000',
        ville: 'Lyon',
        localisation: { lon: 4.835659, lat: 45.764043 },
      },
      {
        numero: 'CH-005',
        title: 'Création terrasse Petit',
        description: 'Pose de carrelage extérieur avec isolation',
        notes: 'Tester la résistance au gel',
        commentaires: 'Prévu pour mars 2025',
        client: 'Clara Petit',
        status: 'À venir',
        debut_prevu: new Date('2025-03-01'),
        fin_prevu: new Date('2025-03-20'),
        personnels: [personnels[8]._id, personnels[9]._id],
        fournitures: [fournitures[8]._id, fournitures[9]._id],
        outillages: [outils[6]._id, outils[7]._id],
        devis: [],
        adresse: '34 Rue des Violettes',
        code_postal: '31000',
        ville: 'Toulouse',
        localisation: { lon: 1.444209, lat: 43.604652 },
      },
      {
        numero: 'CH-006',
        title: 'Réaménagement bureau Garnier',
        description: 'Pose parquet et peinture murale',
        notes: 'Utiliser une peinture écologique',
        commentaires: 'Travaux démarrés le 10/01/2025',
        client: 'Sophie Garnier',
        status: 'En cours',
        debut_prevu: new Date('2025-01-10'),
        fin_prevu: new Date('2025-01-25'),
        personnels: [personnels[4]._id, personnels[5]._id],
        fournitures: [fournitures[3]._id, fournitures[7]._id],
        outillages: [outils[2]._id, outils[4]._id],
        devis: [],
        adresse: '78 Avenue des Fleurs',
        code_postal: '75020',
        ville: 'Paris',
        localisation: { lon: 2.403634, lat: 48.864716 },
      },
      {
        numero: 'CH-007',
        title: 'Rénovation espace collectif Robert',
        description: 'Installation de chape et finition carrelage',
        notes: 'Prévoir les matériaux anti-humidité',
        commentaires: 'Finalisé en octobre 2024',
        client: 'Emma Robert',
        status: 'Terminé',
        debut_prevu: new Date('2024-10-01'),
        fin_prevu: new Date('2024-10-20'),
        personnels: [personnels[7]._id, personnels[2]._id],
        fournitures: [fournitures[5]._id, fournitures[9]._id],
        outillages: [outils[1]._id, outils[8]._id],
        devis: [],
        adresse: '67 Boulevard Haussmann',
        code_postal: '75008',
        ville: 'Paris',
        localisation: { lon: 2.323224, lat: 48.8738 },
      },
    ]);
    

    console.log('Données seed insérées avec succès.');
  } catch (err) {
    console.error('Erreur lors du seed :', err);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
