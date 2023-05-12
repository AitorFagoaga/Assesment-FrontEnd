describe('App', () => {
  
  const filePath = '../../src/api/db.json'
   beforeEach(()=>{
     cy.visit("http://localhost:3000/Socios")
     cy.viewport(1280, 1000)
   })
  it('passes', () => { 
      cy.get('#nuevoSocio').click();
      cy.get('.name').type("Santiago"); 
      cy.get('.email').type("santiago@gmail.com"); 
      cy.get('.apellido').type("Boselli");
      cy.get('.nacimiento').type("01/06/2001");
      cy.get('.plan').select("Plan3");
      cy.get('.dni').type("23.235.268");
      cy.get('.tel').type("1140507093");
      cy.get('.status').select("Baja");
      cy.get('.fechaAlta').type("22/12/2022");
      cy.get('.estadoApto').select("Falta Aprobar");
      cy.get('.vencimientoApto').type("12/03/2024");
      cy.get('.cuponDescuento').select("30% 1 mes");
      cy.get('.nroCupon').type("1203024");
      cy.get('.validezCupon').type("16/10/2023");
      cy.get('.inscribir').click();



    cy.request('GET','http://localhost:3004/Socios/').then(response=>{
      cy.log(response.body);
      expect(response.body[8]).to.exist;
      // expect(response).property('body').to.have.length(9);
      // cy.log(response.body).to.exist
    })
  })


  it('passes', () => { 
    cy.get('.pagos').last().click();
    cy.get('.cancelTimeline').click();
  })

  it('passes', () => { 
    cy.get('.btnHE').last().click();
    cy.get('.cancelHE').click();
  })

  it('passes', () => { 
    cy.get('.btnInfo').last().click();
    cy.get('.cancelInfo').click();
  })


  //edicion
  it('passes', () => { 
    cy.get('.editIcon').last().click();

    cy.get('.nameE').clear().type("Julian"); 
    cy.get('.emailE').clear().type("juli@gmail.com"); 
    cy.get('.apellidoE').clear().type("Alvarez");
    cy.get('.nacimientoE').clear().type("04/08/2001");
    cy.get('.planE').select([]).select("Plan2");
    cy.get('.dniE').clear().type("33.335.368");
    cy.get('.telE').clear().type("1143337093");
    cy.get('.statusE').select([]).select("Alta");
    cy.get('.fechaAltaE').clear().type("22/12/2022");
    cy.get('.estadoAptoE').select([]).select("Aprobado");
    cy.get('.vencimientoAptoE').clear().type("01/05/2024");
    cy.get('.cuponDescuentoE').select([]).select("20% OSDE 1 mes");
    cy.get('.nroCuponE').clear().type("12030888");
    cy.get('.validezCuponE').clear().type("16/03/2023");
    cy.get('.guardarEdit').click();



  cy.request('GET','http://localhost:3004/Socios/').then(response=>{
    cy.log(response.body);
    expect(response.body[8]).property('name').to.eql("Julian");
    // cy.log(response.body)
  })
})

    it('passes', () => { 
      cy.get('.deleteIcon').last().click();
      cy.get('.eliminarSocio').click();




    cy.request('GET','http://localhost:3004/Socios/').then(response=>{
      cy.log(response.body);
      expect(response).property('body').to.have.length(8);
    })
    })


})