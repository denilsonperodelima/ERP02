package com.velocinotech.erp02.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Grupo;
import com.velocinotech.erp02.domain.Subgrupo;
import com.velocinotech.erp02.domain.Subgrupoitem;
import com.velocinotech.erp02.repositories.GrupoRepository;
import com.velocinotech.erp02.repositories.SubgrupoRepository;
import com.velocinotech.erp02.repositories.SubgrupoitemRepository;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;


@Service
public class GrupoService {

	@Autowired
	private GrupoRepository repo;

	@Autowired
	private SubgrupoRepository subgrupoRepository;

	@Autowired
	private SubgrupoitemRepository subgrupoitemRepository;
	
	public Grupo getGrupo(Integer idempresa, String grupo) {
    Grupo  objrepo = repo.getGrupo(idempresa, grupo);	
	    if (objrepo != null) {
			Grupo obj = repo.findOne(objrepo.getId());
			return obj;
		}		
		return objrepo;
	}
	
	@Transactional
	public Grupo insert(Grupo obj) {		
		obj = repo.save(obj);
		
		for (Subgrupo  subgrupos : obj.getSubgrupos()) {	
			subgrupos.setGrupo(obj);	
			
    		for (Subgrupoitem  subgrupoitens : subgrupos.getSubgrupoitens()) {	
    			subgrupoitens.setSubgrupo(subgrupos);	
    		}
    		subgrupoitemRepository.save(subgrupos.getSubgrupoitens()); 
		}	
	    subgrupoRepository.save(obj.getSubgrupos());  
	    
		return obj;
	}
	
	public Grupo find(Integer id) {
		Grupo obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Grupo.class.getName());
		}
		return obj;
	}	
	
	public List<Grupo> getSomenteGrupos(Integer idempresa) {
		List<Grupo> obj = repo.getSomenteGrupos(idempresa);	
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + idempresa + ", Tipo: " + Grupo.class.getName());
		}
		return obj;
	}	
	public void gerarGruposPorEmpresa(Integer empresaid) {

		
		Grupo grp1 = new Grupo (null, empresaid ,"CLIENTE");	

		
		Subgrupo subgrp1 = new Subgrupo (null,"PESSOA", grp1);	
		
		Subgrupoitem subgrpitem1 = new Subgrupoitem (null,subgrp1,"FISICA", null);
		Subgrupoitem subgrpitem2 = new Subgrupoitem (null,subgrp1,"JURIDICA", null);		
		Subgrupoitem subgrpitem3 = new Subgrupoitem (null,subgrp1,"OUTRO", null);
		subgrp1.getSubgrupoitens().addAll(Arrays.asList(subgrpitem1, subgrpitem2, subgrpitem3));
	
		Subgrupo subgrp2 = new Subgrupo (null,"ENDERECO", grp1);

		Subgrupoitem subgrpitem1e = new Subgrupoitem (null,subgrp2,"OPERACIONAL", null);
		Subgrupoitem subgrpitem2e = new Subgrupoitem (null,subgrp2,"COMERCIAL", null);			
		subgrp2.getSubgrupoitens().addAll(Arrays.asList(subgrpitem1e,subgrpitem2e));
		
		Subgrupo subgrp3 = new Subgrupo (null,"CONTATO", grp1);

		Subgrupoitem subgrpitem1c = new Subgrupoitem (null,subgrp3,"FINANCEIRO", null);
		Subgrupoitem subgrpitem2c = new Subgrupoitem (null,subgrp3,"NOTA FISCAL", null);		
		subgrp3.getSubgrupoitens().addAll(Arrays.asList(subgrpitem1c,subgrpitem2c));		

		Subgrupo subgrp4 = new Subgrupo (null,"CONTATOITEM", grp1);

		Subgrupoitem subgrpitem1i = new Subgrupoitem (null,subgrp4,"E-MAIL", null);
		Subgrupoitem subgrpitem2i = new Subgrupoitem (null,subgrp4,"TELEFONE", null);
		Subgrupoitem subgrpitem3i = new Subgrupoitem (null,subgrp4,"CELULAR", null);
		Subgrupoitem subgrpitem4i = new Subgrupoitem (null,subgrp4,"FAX", null);		
		Subgrupoitem subgrpitem5i = new Subgrupoitem (null,subgrp4,"NEXTEL", null);		
		Subgrupoitem subgrpitem6i = new Subgrupoitem (null,subgrp4,"SITE", null);		
		subgrp4.getSubgrupoitens().addAll(Arrays.asList(subgrpitem1i, subgrpitem2i,subgrpitem3i,subgrpitem4i,subgrpitem5i,subgrpitem6i));			

		grp1.getSubgrupos().addAll(Arrays.asList(subgrp1,subgrp2,subgrp3,subgrp4));	

		
		repo.save(grp1);	

	    Grupo grp4 = new Grupo (null, empresaid ,"EMPRESA");	

		
		Subgrupo subgrpempr1 = new Subgrupo (null,"PESSOA", grp4);	
		
		Subgrupoitem subgrpempritem1 = new Subgrupoitem (null,subgrpempr1,"FISICA", null);
		Subgrupoitem subgrpempritem2 = new Subgrupoitem (null,subgrpempr1,"JURIDICA", null);		
		subgrpempr1.getSubgrupoitens().addAll(Arrays.asList(subgrpempritem1, subgrpempritem2));			

		Subgrupo subgrpempr2 = new Subgrupo (null,"STATUS", grp4);	
		
		Subgrupoitem subgrpempritem1X = new Subgrupoitem (null,subgrpempr2,"ATIVA", null);
		Subgrupoitem subgrpempritem2X = new Subgrupoitem (null,subgrpempr2,"SUSPENSA", null);		
		subgrpempr2.getSubgrupoitens().addAll(Arrays.asList(subgrpempritem1X, subgrpempritem2X));	

		Subgrupo subgrpempr4 = new Subgrupo (null,"SEGMENTO", grp4);

		Subgrupoitem subgrpempritem1i = new Subgrupoitem (null,subgrpempr4,"COMERCIO", null);
		Subgrupoitem subgrpempritem2i = new Subgrupoitem (null,subgrpempr4,"INDUSTRIA", null);
		Subgrupoitem subgrpempritem3i = new Subgrupoitem (null,subgrpempr4,"INFORMATICA", null);
		Subgrupoitem subgrpempritem4i = new Subgrupoitem (null,subgrpempr4,"TRANSPORTE", null);		
		Subgrupoitem subgrpempritem5i = new Subgrupoitem (null,subgrpempr4,"LOCADORA", null);		
		Subgrupoitem subgrpempritem6i = new Subgrupoitem (null,subgrpempr4,"METALURGICA", null);		
		subgrpempr4.getSubgrupoitens().addAll(Arrays.asList(subgrpempritem1i, subgrpempritem2i,subgrpempritem3i,subgrpempritem4i,subgrpempritem5i,subgrpempritem6i));			

		grp4.getSubgrupos().addAll(Arrays.asList(subgrpempr1,subgrpempr2,subgrpempr4));	

		repo.save(grp4);

		Grupo grp2 = new Grupo (null, empresaid ,"FORNECEDOR");	
		
		Subgrupo subgrpforana1 = new Subgrupo (null,"PESSOA", grp2);	
		
		Subgrupoitem subgrpforitem1 = new Subgrupoitem (null,subgrpforana1,"FISICA", null);
		Subgrupoitem subgrpforitem2 = new Subgrupoitem (null,subgrpforana1,"JURIDICA", null);		
		subgrpforana1.getSubgrupoitens().addAll(Arrays.asList(subgrpforitem1, subgrpforitem2));
	
		Subgrupo subgrpfor2 = new Subgrupo (null,"ENDERECO-FOR", grp2);

		Subgrupoitem subgrpforitem1e = new Subgrupoitem (null,subgrpfor2,"COMERCIAL", null);
		Subgrupoitem subgrpforitem2e = new Subgrupoitem (null,subgrpfor2,"RESIDENCIAL", null);	
		subgrpfor2.getSubgrupoitens().addAll(Arrays.asList(subgrpforitem1e, subgrpforitem2e));

		
		Subgrupo subgrpfor3 = new Subgrupo (null,"CONTATO", grp2);

		Subgrupoitem subgrpforitem1c = new Subgrupoitem (null,subgrpfor3,"FINANCEIRO", null);
		Subgrupoitem subgrpforitem2c = new Subgrupoitem (null,subgrpfor3,"OPERACIONAL", null);
		subgrpfor3.getSubgrupoitens().addAll(Arrays.asList(subgrpforitem1c, subgrpforitem2c));		

		Subgrupo subgrpfor4 = new Subgrupo (null,"CONTATOITEM", grp2);

		Subgrupoitem subgrpforitem1i = new Subgrupoitem (null,subgrpfor4,"E-MAIL", null);
		Subgrupoitem subgrpforitem2i = new Subgrupoitem (null,subgrpfor4,"TELEFONE", null);
		Subgrupoitem subgrpforitem3i = new Subgrupoitem (null,subgrpfor4,"CELULAR", null);
		Subgrupoitem subgrpforitem4i = new Subgrupoitem (null,subgrpfor4,"FAX", null);		
		Subgrupoitem subgrpforitem5i = new Subgrupoitem (null,subgrpfor4,"NEXTEL", null);		
		Subgrupoitem subgrpforitem6i = new Subgrupoitem (null,subgrpfor4,"SITE", null);		
		subgrpfor4.getSubgrupoitens().addAll(Arrays.asList(subgrpforitem1i, subgrpforitem2i,subgrpforitem3i,subgrpforitem4i,subgrpforitem5i,subgrpforitem6i));			

		grp2.getSubgrupos().addAll(Arrays.asList(subgrpfor2,subgrpfor2,subgrpfor3,subgrpfor4));	

		
		repo.save(grp2);	
	    Grupo grpfuncionario = new Grupo (null, empresaid ,"FUNCIONARIO");	

		
		Subgrupo subgrpfuncfuncionario = new Subgrupo (null,"STATUS", grpfuncionario);	
		
		Subgrupoitem subgrpfuncitem1 = new Subgrupoitem (null,subgrpfuncfuncionario,"ATIVO", null);
		Subgrupoitem subgrpfuncitem2 = new Subgrupoitem (null,subgrpfuncfuncionario,"SUSPENSO", null);		
		subgrpfuncfuncionario.getSubgrupoitens().addAll(Arrays.asList(subgrpfuncitem1, subgrpfuncitem2));
		
		Subgrupo subgrpfunc2 = new Subgrupo (null,"ESTCIVIL", grpfuncionario);
		
		Subgrupoitem subgrpfuncitem1e = new Subgrupoitem (null,subgrpfunc2,"CASADO", null);
		Subgrupoitem subgrpfuncitem2e = new Subgrupoitem (null,subgrpfunc2,"SOLTEIRO", null);	
		subgrpfunc2.getSubgrupoitens().addAll(Arrays.asList(subgrpfuncitem1e, subgrpfuncitem2e));
		
		Subgrupo subgrpfunc3 = new Subgrupo (null,"CONTATO", grpfuncionario);
		
		Subgrupoitem subgrpfuncitem1c = new Subgrupoitem (null,subgrpfunc3,"MAE", null);
		Subgrupoitem subgrpfuncitem2c = new Subgrupoitem (null,subgrpfunc3,"PAI", null);
		Subgrupoitem subgrpfuncitem3c = new Subgrupoitem (null,subgrpfunc3,"PESSOAL", null);
		subgrpfunc3.getSubgrupoitens().addAll(Arrays.asList(subgrpfuncitem1c,subgrpfuncitem2c,subgrpfuncitem3c));		
		
		Subgrupo subgrpfunc4 = new Subgrupo (null,"CONTATOITEM", grpfuncionario);
		
		Subgrupoitem subgrpfuncitem1i = new Subgrupoitem (null,subgrpfunc4,"E-MAIL", null);
		Subgrupoitem subgrpfuncitem2i = new Subgrupoitem (null,subgrpfunc4,"TELEFONE", null);
		Subgrupoitem subgrpfuncitem3i = new Subgrupoitem (null,subgrpfunc4,"CELULAR", null);
		Subgrupoitem subgrpfuncitem4i = new Subgrupoitem (null,subgrpfunc4,"FAX", null);		
		Subgrupoitem subgrpfuncitem5i = new Subgrupoitem (null,subgrpfunc4,"NEXTEL", null);		
		Subgrupoitem subgrpfuncitem6i = new Subgrupoitem (null,subgrpfunc4,"SITE", null);		
		subgrpfunc4.getSubgrupoitens().addAll(Arrays.asList(subgrpfuncitem1i, subgrpfuncitem2i,subgrpfuncitem3i,subgrpfuncitem4i,subgrpfuncitem5i,subgrpfuncitem6i));			
		
		
		Subgrupo subgrpfunc5 = new Subgrupo (null,"TIPOENDER", grpfuncionario);

		Subgrupoitem subgrpfuncitem22e = new Subgrupoitem (null,subgrpfunc5,"RESIDENCIAL", null);	
		subgrpfunc5.getSubgrupoitens().addAll(Arrays.asList( subgrpfuncitem22e)); 
		
		
		grpfuncionario.getSubgrupos().addAll(Arrays.asList(subgrpfuncfuncionario,subgrpfunc2,subgrpfunc3,subgrpfunc4,subgrpfunc5));	
		
		
		repo.save(grpfuncionario);	
	    Grupo grpvendedor = new Grupo (null, empresaid ,"VENDEDOR");	

		
		Subgrupo subgrpvendvendedor = new Subgrupo (null,"STATUS", grpvendedor);	
		
		Subgrupoitem subgrpvenditem1 = new Subgrupoitem (null,subgrpvendvendedor,"ATIVO", null);
		Subgrupoitem subgrpvenditem2 = new Subgrupoitem (null,subgrpvendvendedor,"INATIVO", null);		
		subgrpvendvendedor.getSubgrupoitens().addAll(Arrays.asList(subgrpvenditem1, subgrpvenditem2));

		Subgrupo subgrpvend2 = new Subgrupo (null,"TIPOVEND", grpvendedor);

		Subgrupoitem subgrpvenditem1e = new Subgrupoitem (null,subgrpvend2,"INTERNO", null);
		Subgrupoitem subgrpvenditem2e = new Subgrupoitem (null,subgrpvend2,"EXTERNO", null);	
		subgrpvend2.getSubgrupoitens().addAll(Arrays.asList(subgrpvenditem1e, subgrpvenditem2e));
		
		Subgrupo subgrpvend3 = new Subgrupo (null,"CONTATO", grpvendedor);

		Subgrupoitem subgrpvenditem1c = new Subgrupoitem (null,subgrpvend3,"FINANCEIRO", null);
		Subgrupoitem subgrpvenditem2c = new Subgrupoitem (null,subgrpvend3,"OPERACIONAL", null);
		subgrpvend3.getSubgrupoitens().addAll(Arrays.asList(subgrpvenditem1c, subgrpvenditem2c));		

		Subgrupo subgrpvend4 = new Subgrupo (null,"CONTATOITEM", grpvendedor);

		Subgrupoitem subgrpvenditem1i = new Subgrupoitem (null,subgrpvend4,"E-MAIL", null);
		Subgrupoitem subgrpvenditem2i = new Subgrupoitem (null,subgrpvend4,"TELEFONE", null);
		Subgrupoitem subgrpvenditem3i = new Subgrupoitem (null,subgrpvend4,"CELULAR", null);
		Subgrupoitem subgrpvenditem4i = new Subgrupoitem (null,subgrpvend4,"FAX", null);		
		Subgrupoitem subgrpvenditem5i = new Subgrupoitem (null,subgrpvend4,"NEXTEL", null);		
		Subgrupoitem subgrpvenditem6i = new Subgrupoitem (null,subgrpvend4,"SITE", null);		
		subgrpvend4.getSubgrupoitens().addAll(Arrays.asList(subgrpvenditem1i, subgrpvenditem2i,subgrpvenditem3i,subgrpvenditem4i,subgrpvenditem5i,subgrpvenditem6i));			


		Subgrupo subgrpvend5 = new Subgrupo (null,"TIPOENDER", grpvendedor);

		Subgrupoitem subgrpvenditem11e = new Subgrupoitem (null,subgrpvend5,"COMERCIAL", null);
		Subgrupoitem subgrpvenditem22e = new Subgrupoitem (null,subgrpvend5,"RESIDENCIAL", null);	
		subgrpvend5.getSubgrupoitens().addAll(Arrays.asList(subgrpvenditem11e, subgrpvenditem22e)); 
		
		Subgrupo subgrpvend6 = new Subgrupo (null,"PESSOA", grpvendedor);	
		
		Subgrupoitem subgrpvendxitem1 = new Subgrupoitem (null,subgrpvend6,"FISICA", null);
		Subgrupoitem subgrpvendxitem2 = new Subgrupoitem (null,subgrpvend6,"JURIDICA", null);		
		subgrpvend6.getSubgrupoitens().addAll(Arrays.asList(subgrpvendxitem1, subgrpvendxitem2));
		
		grpvendedor.getSubgrupos().addAll(Arrays.asList(subgrpvendvendedor,subgrpvend2,subgrpvend3,subgrpvend4,subgrpvend5,subgrpvend6));	

		
		repo.save(grpvendedor);	
				
	}	
}