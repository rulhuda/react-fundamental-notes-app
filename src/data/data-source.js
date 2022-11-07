import API_ENDPOINT from "../globals/api-endpoint";
import { deleteCookie, getCookie } from "../utils/cookies";

class DataSource {
  static async Register(data) {
    try {
      const request = await fetch(API_ENDPOINT.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await request.json();

      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  static async Login(data) {
    try {
      const request = await fetch(API_ENDPOINT.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await request.json();
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  static async Profile() {
    try {
      const request = await fetch(API_ENDPOINT.ME, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`,
        }
      });
  
      const response = await request.json();
      if (response.status !== 'success') {
        deleteCookie('token');
        window.location.href = "/";
        return;
      }
      
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
    
  }

  static async CreateNote(data) {
    try {
      const request = await fetch(API_ENDPOINT.NOTES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify(data),
      });

      const response = await request.json();

      return response;
    } catch (error) {
      
    }
  }

  static async GetNotes() {
    const request = await fetch(API_ENDPOINT.NOTES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization : `Bearer ${getCookie('token')}`,
      },
    });
    const response = await request.json();

    if (response.status !== 'success') {
      deleteCookie('token');
      window.location.href = "/";
      return;
    }

    return response;
  }

  static async GetNote(id) {
    const request = await fetch(API_ENDPOINT.SINGLE_NOTE(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization : `Bearer ${getCookie('token')}`,
      },
    });

    const response = await request.json();

    if (response.status !== 'success') {
      window.location.href = "/404";
      return;
    }

    return response.data;
  }

  static async GetArchiveNotes() {
    const request = await fetch(API_ENDPOINT.NOTES_ARCHIVED, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization : `Bearer ${getCookie('token')}`,
      },
    });

    const response = await request.json();
    if (response.status !== 'success') {
      deleteCookie('token');
      window.location.href = "/";
      return;
    }

    return response;
  }

  static async DeleteNote(id) {
    try {
      const request = await fetch(API_ENDPOINT.DELETE_NOTE(id), {
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        }
      });

      const response = await request.json();

      if (response.status !== 'success') {
        deleteCookie('token');
        window.location.href = "/";
        return;
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async ActionArchiveNote(id) {
    try {
      const request = await fetch(API_ENDPOINT.ACTION_ARCHIVE(id), {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        }
      });

      const response = await request.json();
      if (response.status !== 'success') {
        deleteCookie('token');
        window.location.href = "/";
        return;
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async ActionUnarchiveNote(id) {
    try {
      const request = await fetch(API_ENDPOINT.ACTION_UNARCHIVE(id), {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        }
      });
      
      const response = await request.json();
      if (response.status !== 'success') {
        deleteCookie('token');
        window.location.href = "/";
        return;
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default DataSource;
