//EN UTILISANT LA CLASS DEFINE DANS LE DOMAIN

function dealEstimatedDamage(damageTarget) {
    const damageProcessor = new DamageProcessor(getUserFromHabiticaUser, new HabiticaAPI())
    damageProcessor.handle(damageTarget);
}