// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Denuncia from '../../Models/Denuncia'

export default class DenunciasController {

  public async index({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    // Obtém o ID da denúncia a ser atualizada a partir dos parâmetros da rota
    const denunciaId = params.id;

    // Obtém os novos dados da denúncia a partir do corpo da solicitação HTTP
    const data = request.only(['CEP', 'Endereco', 'Descricao']);

    // Busca a denúncia no banco de dados
    const denuncia = await Denuncia.findOrFail(denunciaId);

    // Atualiza os dados da denúncia com os novos dados
    denuncia.merge(data);

    // Salva as alterações no banco de dados
    await denuncia.save();
  }
}
