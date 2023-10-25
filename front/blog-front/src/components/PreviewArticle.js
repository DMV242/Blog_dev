import axios from "axios";
import { useEffect } from "react";

const PreviewArticle = ({
  idSelected,
  onDelete,
  onEdit,
  setArticle,
  article,
  showFormCreate,
  showModal,
}) => {
  useEffect(() => {
    const controller = new AbortController();
    async function fetchArticle() {
      const articleData = axios.get(
        `https://blog-api-wu4d.onrender.com/api/getOneArticle/${idSelected}`,
        {
          signal: controller.signal,
        }
      );
      setArticle((await articleData).data);
    }
    onEdit(false);
    fetchArticle();
    return () => {
      controller.abort();
    };
  }, [idSelected]);

  function handleEdit() {
    onEdit(true);
    showModal(true);
    showFormCreate(false);
  }

  function handleDelete(id, context) {
    showFormCreate(false);
    onDelete(id, context);
  }
  return (
    <li className="flex flex-col p-5 bg-slate-800 mb-24 rounded-xl hover:translate-x-3 transition-transform">
      <h2 className="text-2xl md:text-3xl text-white underline uppercase mb-5">
        {article.title}
      </h2>
      <p className="text-sm  md:text-lg italic text-gray-300 mb-2.5">
        {article.description}
      </p>
      <p className="text-lg md:text-xl text-white mb-4">{article.content}</p>
      <div className="p-3">
        <button
          className="bg-green-500 text-center p-2 rounded-xl mr-3 font-bold hover:bg-green-800 transition"
          onClick={handleEdit}
        >
          Edit ✏️
        </button>
        <button
          className="bg-red-100 text-center p-2 rounded-xl font-bold hover:bg-red-400 transition"
          onClick={() => handleDelete(article._id, "ArticlePreview")}
        >
          delete ❌
        </button>
      </div>
    </li>
  );
};

export default PreviewArticle;