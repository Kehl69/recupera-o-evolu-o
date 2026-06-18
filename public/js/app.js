const API = '/api/tarefas';
let filtroAtual = 'todas';
let todasAsTarefas = [];

// ===== CRUD Functions =====

async function carregarTarefas() {
  try {
    const res = await fetch(API);
    const json = await res.json();
    todasAsTarefas = json.dados || [];
    renderizarTarefas();
  } catch (err) {
    mostrarToast('Erro ao conectar com o servidor', 'error');
  } finally {
    document.getElementById('loading').style.display = 'none';
  }
}

async function criarTarefa() {
  const titulo = document.getElementById('titulo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const prioridade = document.getElementById('prioridade').value;

  if (!titulo) {
    mostrarToast('O título é obrigatório!', 'error');
    document.getElementById('titulo').focus();
    return;
  }

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, descricao, prioridade }),
    });

    const json = await res.json();

    if (res.status === 201) {
      mostrarToast('Tarefa criada! ✓', 'success');
      document.getElementById('titulo').value = '';
      document.getElementById('descricao').value = '';
      document.getElementById('prioridade').value = 'media';
      carregarTarefas();
    } else {
      mostrarToast(json.mensagem || 'Erro ao criar tarefa', 'error');
    }
  } catch (err) {
    mostrarToast('Erro de conexão', 'error');
  }
}

async function deletarTarefa(id) {
  if (!confirm('Tem certeza que quer deletar essa tarefa?')) return;

  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    const json = await res.json();

    if (res.ok) {
      mostrarToast('Tarefa removida', 'success');
      carregarTarefas();
    } else {
      mostrarToast(json.mensagem, 'error');
    }
  } catch (err) {
    mostrarToast('Erro ao deletar', 'error');
  }
}

function abrirEdicao(tarefa) {
  document.getElementById('edit-id').value = tarefa._id;
  document.getElementById('edit-titulo').value = tarefa.titulo;
  document.getElementById('edit-descricao').value = tarefa.descricao || '';
  document.getElementById('edit-status').value = tarefa.status;
  document.getElementById('edit-prioridade').value = tarefa.prioridade;
  document.getElementById('modal').style.display = 'flex';
}

async function salvarEdicao() {
  const id = document.getElementById('edit-id').value;
  const titulo = document.getElementById('edit-titulo').value.trim();
  const descricao = document.getElementById('edit-descricao').value.trim();
  const status = document.getElementById('edit-status').value;
  const prioridade = document.getElementById('edit-prioridade').value;

  if (!titulo) {
    mostrarToast('Título obrigatório!', 'error');
    return;
  }

  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, descricao, status, prioridade }),
    });

    const json = await res.json();

    if (res.ok) {
      mostrarToast('Tarefa atualizada! ✓', 'success');
      document.getElementById('modal').style.display = 'none';
      carregarTarefas();
    } else {
      mostrarToast(json.mensagem || 'Erro ao atualizar', 'error');
    }
  } catch (err) {
    mostrarToast('Erro de conexão', 'error');
  }
}

// ===== Render & Filter =====

function filtrar(status, btn) {
  filtroAtual = status;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderizarTarefas();
}

function renderizarTarefas() {
  const lista = document.getElementById('lista-tarefas');
  const emptyState = document.getElementById('empty-state');

  const tarefas = filtroAtual === 'todas'
    ? todasAsTarefas
    : todasAsTarefas.filter(t => t.status === filtroAtual);

  if (tarefas.length === 0) {
    lista.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  const statusLabel = { pendente: 'Pendente', em_andamento: 'Em andamento', concluida: 'Concluída' };

  lista.innerHTML = tarefas.map((t, i) => `
    <div class="task-card" style="animation-delay: ${i * 40}ms">
      <div class="task-priority-dot priority-${t.prioridade}"></div>
      <div class="task-content">
        <div class="task-titulo">${escapar(t.titulo)}</div>
        ${t.descricao ? `<div class="task-descricao">${escapar(t.descricao)}</div>` : ''}
        <div class="task-meta">
          <span class="badge badge-${t.status}">${statusLabel[t.status]}</span>
          <span class="task-date">${formatarData(t.createdAt)}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="btn-icon edit" onclick='abrirEdicao(${JSON.stringify(t)})' title="Editar">✎</button>
        <button class="btn-icon delete" onclick="deletarTarefa('${t._id}')" title="Deletar">✕</button>
      </div>
    </div>
  `).join('');
}

// ===== Helpers =====

function escapar(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function formatarData(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

function fecharModal(e) {
  if (e.target === document.getElementById('modal')) {
    document.getElementById('modal').style.display = 'none';
  }
}

function mostrarToast(msg, tipo = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${tipo} show`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== Init =====
carregarTarefas();
