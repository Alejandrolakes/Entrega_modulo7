const Bicicleta =require('../models/Bicicleta')


exports.index = async (req, res, next) => {
    try {
        const { success } = req.query
        const bicicletas = await Bicicleta.findAll()
        res.render('bicicletas/index', { bicicletas, success })
    } catch (error) {
        next(error)
    }
}

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params
        const { success } = req.query
        const bicicleta = await Bicicleta.findById(id)
        if (!bicicleta) return res.status(404).send(`Bicicleta con el id: ${id} no encontrada`)
        res.render('bicicletas/show', { bicicleta, success })
    } catch (error) {
        next(error)
    }
}

exports.new = async (req, res, next) => {
    try {
        res.render('bicicletas/new')
    } catch (error) {
        next(error)
    }
}

exports.create = async (req, res, next) => {
    try {
        const { marca, modelo, tipo, precio, disponible, year } = req.body
        
        if (!marca || !modelo || !tipo || !precio || !year) {
            res.status(400).send('Todos los datos son obligatorios!')
        }

        const nuevaBici = await Bicicleta.create({
            marca, modelo, tipo, precio: parseFloat(precio), disponible, year: parseInt(year)
        })

        console.log('Se ha creado una nueva bicicleta: ', nuevaBici)

        const msg = encodeURIComponent('Bicicleta creada exitosamente!')

        res.redirect(`/bicicletas?success=${msg}`)
    } catch (error) {
        next(error)
    }
}

exports.edit = async (req, res, next) => {
    try {
        const { id } = req.params

        const bicicleta = await Bicicleta.findById(id)

        const tipos = ['mtb', 'ruta', 'trail', 'enduro', 'bmx'].map(tipo => ({
            value: tipo,
            selected: tipo === bicicleta.tipo
        }))

        res.render('bicicletas/edit', { bicicleta, tipos })
    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params
        const { marca, modelo, tipo, precio, disponible, year } = req.body
    
        const biciActualizada = await Bicicleta.update(id, { marca, modelo, tipo, precio: parseFloat(precio), disponible, year: parseInt(year) })
        
        console.log(`Se ha actualizado la bicicleta id: ${id}: `, biciActualizada)
        const msg = encodeURIComponent('Bicicleta actualizada exitosamente!')
        res.redirect(`/bicicletas/${id}?success=${msg}`)
    } catch (error) {
        next(error)
    }
}

exports.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params

        const biciEliminada = await Bicicleta.deleteById(id)

        console.log('Bicicleta eliminada exitosamente: ', biciEliminada)
        const msg = encodeURIComponent('Bicicleta eliminada exitosamente!')
        res.redirect(`/bicicletas?success=${msg}`)
    } catch (error) {
        next(error)
    }
    
}