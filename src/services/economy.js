const UserCurrency = require("../models/UserCurrency.js");

class EconomySystem {

    async getUser(userId) {
        let user = await UserCurrency.findOne({ userId });

        if (!user) {
            user = new UserCurrency({
                userId,
                balance: 0.
            });
            await user.save();
        }
        return user;
    }

    async getBalance(settings) {
        try {
            const user = await this.getUser(settings.userId);

            return {
                error: false,
                type: "success",
                balance: user.balance,
            };
        } catch (error) {
            console.error("❌ Error interno:", error);
            return {
                error: true,
                type: "database-error",
            };
        }
    }
}

module.exports = EconomySystem;