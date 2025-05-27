import createMockPet from "../mock/mockingPets.js";
import createMockUser from "../mock/mockingUser.js";
import generateMockData from "../services/mocks.services.js";

const mockPet = async (req, res) => {
    try {
        const pets = createMockPet(100);
        res.json(pets);
    } catch (error) {
        console.error("Error al generar mascotas mock:", error);
        res.status(500).json({ error: "Error al generar mascotas de prueba." });
    }
};

const mockUser = async (req, res) => {
    try {
        const users = createMockUser(50);
        res.json(users);
    } catch (error) {
        console.error("Error al generar usuarios mock:", error);
        res.status(500).json({ error: "Error al generar usuarios de prueba." });
    }
};

const generateData = async (req, res) => {
    try {
        const { users, pets } = req.body;

        if (
            (typeof users !== "number" || users < 0) &&
            (typeof pets !== "number" || pets < 0)
        ) {
            return res.status(400).json({
                error: "Se debe enviar al menos 'users' o 'pets' como números positivos.",
            });
        }

        const result = await generateMockData(users, pets);
        return res.json({
            message: "Datos generados correctamente",
            ...result,
        });
    } catch (error) {
        console.error("Error al generar datos:", error);
        res.status(500).json({ error: "Error interno al generar datos." });
    }
};

export default {
    mockPet,
    mockUser,
    generateData,
};
