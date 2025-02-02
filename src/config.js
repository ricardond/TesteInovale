const API_URL = 'http://localhost:3000/settings';

export async function saveSettings(newSettings) {
    try {
        // 1️⃣ Obter as configurações atuais antes de sobrescrever
        const response = await fetch(API_URL);
        const currentSettings = await response.json();

        // 2️⃣ Mesclar as novas configurações com as antigas
        const updatedSettings = { ...currentSettings, ...newSettings };

        // 3️⃣ Salvar os dados atualizados
        await fetch(API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSettings)
        });

        console.log('Configurações salvas:', updatedSettings);
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
    }
}

export async function loadSettings() {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        return {};
    }
}
